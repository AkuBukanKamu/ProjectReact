import React from "react";

const Avatar = ({ name }) => {
  const apiUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}?size=42?background=random?rounded=true?length=1`;

  return <img src={apiUrl} alt="Avatar" style={{borderRadius:"100%"}} width={64}/>;
};

export default Avatar;
