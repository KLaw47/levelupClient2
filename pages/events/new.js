import EventForm from '../../components/event/EventForm';
import { useAuth } from '../../utils/context/authContext';

const NewEvent = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Register An Event</h2>
      <EventForm user={user} />
    </div>
  );
};

export default NewEvent;
