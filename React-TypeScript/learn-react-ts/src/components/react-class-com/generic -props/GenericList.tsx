type ListPropsType<T> = {
  items: T[];
  onClick: (value: T) => void;
};

const GenericList = <T extends { id: number }>({
  items,
  onClick,
}: ListPropsType<T>) => {
  return (
    <div>
      <div>Items List Here </div>
      <ul>
        {items.map((item, i) => {
          return (
            <li onClick={() => onClick(item)} key={item.id}>
              {item.id}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GenericList;

// import React from "react";

// type ListPropsType = {
//   items: string[] | number[]
//   onClick: (value: string | number) => void;
// };
// const GenericList = ({ items, onClick }: ListPropsType) => {
//   return (
//     <div>
//       <div>Items List Here </div>
//       <ul>
//         {items.map((item, i) => {
//           return (
//             <li onClick={() => onClick(item)} key={i}>
//               {item}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default GenericList;
