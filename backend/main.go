package main

import (
    "time"
    "net/http"
    "github.com/gin-gonic/gin"
    "strconv"
    "context"
    "fmt"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
    "github.com/gin-contrib/cors"
)
type Event struct {
    Id            int       `bson:"id"`
    Type          string    `bson:"type"`
    DateTimeStart time.Time `bson:"datetime_start"`
    DateTimeEnd   time.Time `bson:"datetime_end"`
    Title         string    `bson:"title"`
    Description   string    `bson:"description"`
    UserID        string    `bson:"userid"`

}
type User struct{
    UserID int
    Username string

}
var client *mongo.Client
var err error
func main() {
    // Use the SetServerAPIOptions() method to set the Stable API version to 1
    serverAPI := options.ServerAPI(options.ServerAPIVersion1)
    opts := options.Client().ApplyURI("mongodb+srv://Nicolas:W3lEsiqV8FNZ1P8O@cluster0.nei4zc9.mongodb.net/?retryWrites=true&w=majority").SetServerAPIOptions(serverAPI)
    // Create a new client and connect to the server
    client, err = mongo.Connect(context.TODO(), opts)
    if err != nil {
        panic(err)
    }
    defer func() {
        if err = client.Disconnect(context.TODO()); err != nil {
            panic(err)
        }
    }()
    // Send a ping to confirm a successful connection
    if err := client.Database("admin").RunCommand(context.TODO(), bson.D{{"ping", 1}}).Err(); err != nil {
        panic(err)
    }
    fmt.Println("Pinged your deployment. You successfully connected to MongoDB!")


    router := gin.Default()

    config := cors.DefaultConfig()
    config.AllowOrigins = []string{"http://localhost:3000"}
    router.Use(cors.New(config))

    router.GET("/events", getEvents)
    router.GET("/events/:id", getEventsByUserID)
    router.DELETE("/events/:id", deleteEventById)
    router.POST("/events", addEvent)

    router.Run("localhost:8080")
}
func getEvents(c *gin.Context) {
    ctx := context.TODO()

    collection := client.Database("PlanningApp").Collection("Events")

    cursor, err := collection.Find(ctx, bson.M{})
    if err != nil {
        panic(err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to query events"})
        return
    }
    var events []Event
    if err := cursor.All(ctx, &events); err != nil {
        panic(err)
    }

    c.JSON(http.StatusOK, gin.H{"events": events})
}
func getEventsByUserID(c *gin.Context) {
    ctx := context.TODO()
    collection := client.Database("PlanningApp").Collection("Events")

    userIDString:= c.Param("id")
    userID, err := strconv.Atoi(userIDString)
    if err != nil {
        panic(err)
    }

    filter := bson.D{{"userid", userID}}
    cursor, err := collection.Find(ctx, filter)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to query events"})
        return
    }


    var events []Event
    if err := cursor.All(ctx, &events); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve events"})
        return
    }


    c.JSON(http.StatusOK, gin.H{"events": events})
}
func addEvent(c *gin.Context) {
    var newEvent Event
    if err := c.ShouldBindJSON(&newEvent); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    ctx := context.TODO() 

    collection := client.Database("PlanningApp").Collection("Events")

    // Find the maximum ID in the collection
    var maxIDResult struct {
        MaxID int `bson:"max_id"`
    }
    pipeline := []bson.M{
        {
            "$group": bson.M{
                "_id": nil,
                "max_id": bson.M{"$max": "$id"},
            },
        },
    }
    cursor, err := collection.Aggregate(ctx, pipeline)
    if err != nil {
        panic(err)
        return
    }
    if cursor.Next(ctx) {
        if err := cursor.Decode(&maxIDResult); err != nil {
            panic(err)
            return
        }
    }
    cursor.Close(ctx)

    // Increment the maximum ID to generate the next available ID
    newEvent.Id = maxIDResult.MaxID + 1

    _, err = collection.InsertOne(ctx, newEvent)
    if err != nil {
        panic(err)
        return
    }

    c.JSON(http.StatusCreated, gin.H{"created": newEvent})
}


func deleteEventById(c *gin.Context) {
  ctx := context.TODO()
  collection := client.Database("PlanningApp").Collection("Events")

  IDString := c.Param("id")


  ID, err := strconv.Atoi(IDString)
  if err != nil {
    c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
    return
  }
  filter := bson.M{"id": ID}

      
  _, err = collection.DeleteOne(ctx, filter)      
  if err != nil {
    c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete the event"})
    return
  }
  c.JSON(http.StatusOK, gin.H{"message": "Event deleted successfully"})
}

