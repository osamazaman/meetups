import { MongoClient } from 'mongodb'

async function handler( req, res ){

  if (req.method == 'POST'){
      const data = req.body;
      console.log("here2")
      const client = await MongoClient.connect(
        'mongodb+srv://admin:admin@cluster0.xzhkt.mongodb.net/meetups?retryWrites=true&w=majority'
        );
    const db=client.db();

    const meetupsCollection = db.collection('meetups');
    
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({message:"Successfully inserted data"});
}

}

export default handler;
