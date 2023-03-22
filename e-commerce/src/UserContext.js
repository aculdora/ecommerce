import React from 'react';

// Creates a context object
// A context object with object data type that can used to store information that can be share to other components within the application

const UserContext = React.createContext();

// console.log("Contents of UserContext");
// console.log(UserContext);

// The "Provider" components allows other components to consume/use the context object and supply the necessary information needed in the context object.

// The provider is used to create a context that can be consumed.
export const UserProvider = UserContext.Provider;

export default UserContext;
