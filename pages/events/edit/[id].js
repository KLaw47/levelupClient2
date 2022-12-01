import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getEventById } from '../../../utils/data/eventData';
import EventForm from '../../../components/event/EventForm';
import { useAuth } from '../../../utils/context/authContext';

export default function EditEvent() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const user = useAuth();

  useEffect(() => {
    getEventById(id).then(setEditItem);
  }, [id]);
  return (<EventForm user={user} obj={editItem} />);
}
