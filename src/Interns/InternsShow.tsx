import { useGetOne, useRecordContext } from 'react-admin';
const UserProfile = () => {
    const record = useRecordContext();
    const { data: user, isPending, error } = useGetOne('users', { id: record.userId });
    if (isPending) { return <Loading />; }
    if (error) { return <p>ERROR</p>; }
    return <div>User {user.username}</div>;
};