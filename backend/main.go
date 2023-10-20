package main

import (
    "context"
    "fmt"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)
type Event struct {
  Type string
  DateTime string
  Title string
  Description string

}
func main() {
  // Use the SetServerAPIOptions() method to set the Stable API version to 1
  serverAPI := options.ServerAPI(options.ServerAPIVersion1)
  opts := options.Client().ApplyURI("mongodb+srv://Nicolas:HP4CESCG7EDFVYlU@cluster0.nei4zc9.mongodb.net/?retryWrites=true&w=majority").SetServerAPIOptions(serverAPI)
  // Create a new client and connect to the server
  client, err := mongo.Connect(context.TODO(), opts)
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
  router.GET("/events", getEvents)
  router.GET("/events/:user", getEventsByUser)

  router.Run("localhost:8080")
}
func getEvents(c *gin.Context) {
    //query db for events
    var events := []
    c.JSON(http.StatusOK, gin.H{"events": events})
}

func getEventsByUser(c *gin.Context) {
    var user := c.Param("user")
    //query db for events
    var events := []
    c.JSON(http.StatusOK, gin.H{"events": events})
}
