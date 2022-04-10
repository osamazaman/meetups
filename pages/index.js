import MeetupList from "../components/meetups/MeetupList"
import { MongoClient } from "mongodb";

const Homepage = (props) => {

    return <MeetupList meetups = {props.meetups} /> 

}

export async function getStaticProps(){
    const client = await MongoClient.connect(
        'mongodb+srv://admin:admin@cluster0.xzhkt.mongodb.net/meetups?retryWrites=true&w=majority'
        );
    const db=client.db();
    
    const meetupCollection = db.collection('meetups');

    const meetups = await meetupCollection.find().toArray();

    console.log("meetups", meetups)
    
    client.close();

    return{
        props:{
            meetups: meetups.map(meetup=>({
                title:meetup.title,
                address:meetup.address,
                image:meetup.image,
                id:meetup._id.toString()
            }))
        },
        revalidate:1
    };
}

export default Homepage;

