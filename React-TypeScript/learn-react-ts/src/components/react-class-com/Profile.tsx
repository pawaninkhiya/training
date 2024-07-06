export type PrivatePropsType = {
  name: string;
};

const Profile = ({ name }: PrivatePropsType) => {
  return <div>User name is : {name}</div>;
};

export default Profile;
