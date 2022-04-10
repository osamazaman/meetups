import { useRouter } from "next/router";
import MeetupForm from "../../components/meetups/NewMeetupForm"

const NewMeetup = () => {

  const router=useRouter();
  async function addMeetup(meetupData){
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers:{
        'Content-Type': 'application/json'
      }
    });
  

    const data = await response.json();

    console.log(data)

    router.push('/')
  }

  return <MeetupForm onAddMeetup={addMeetup}/>
}

export default NewMeetup;
