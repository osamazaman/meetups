import { MongoClient, ObjectId } from "mongodb"
import MeetupDetail from "../../components/meetups/MeetupDetail"

const MeetupDetails = (props) => {

    return <>
        <MeetupDetail
            id={props.meetupData.id}
            image={props.meetupData.image}
            description={props.meetupData.description}
            address={props.meetupData.address}
            title={props.meetupData.title}
        />
    </>
}


export const getStaticPaths = async () => {


    const client = await MongoClient.connect(
        'mongodb+srv://admin:admin@cluster0.xzhkt.mongodb.net/meetups?retryWrites=true&w=majority'
        );
    const db=client.db();
    
    const meetupCollection = db.collection('meetups');

    const meetups = await meetupCollection.find({},{_id:1}).toArray();
    client.close();
    return {
        fallback:false,
        paths:  meetups.map(meetup=>({
            params:{meetupId:meetup._id.toString()},
        }))
    };

}

export async function getStaticProps (context) {

    const meetupId = context.params.meetupId
    const client = await MongoClient.connect(
        'mongodb+srv://admin:admin@cluster0.xzhkt.mongodb.net/meetups?retryWrites=true&w=majority'
        );
    const db = client.db();

    const meetupCollection = db.collection('meetups');

    const selectedMeetup = await meetupCollection.findOne({ 
        _id: ObjectId(meetupId)
    });
    client.close();



    return {
        props: {
            meetupData:{
                id:selectedMeetup._id.toString(),
                image:selectedMeetup.image,
                title:selectedMeetup.title,
                address:selectedMeetup.address,
                description:selectedMeetup.description
            }
    }
}
}

export default MeetupDetails;
