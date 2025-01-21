// import { createContext, useContext } from 'react';

// const MyContext = createContext(null); // Initial value can be null or any default value
// type 
// export const useMyContext = () => {
//   const context = useContext(MyContext);
//   if (!context) {
//     throw new Error('useMyContext must be used within a MyContextProvider');
//   }
//   return context;
// };

// export const MyContextProvider = ({ children }) => {
//   const contextValue = { /* your state or value here */ };
//   return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
// };
