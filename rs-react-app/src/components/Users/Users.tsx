import type { User } from '../../store/usersSlice';
import { UserCard } from '../User/User';
import './users.css';

export const Users = ({ users }: { users: User[] }) => {
  if (users.length === 0) {
    return (
      <div>
        <p>No users</p>
      </div>
    );
  }
  return (
    <div className="users">
      {users.map((user) => (
        <UserCard key={user.email} user={user} />
      ))}
    </div>
  );
};
