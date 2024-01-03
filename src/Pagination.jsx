import React from 'react';

export const Pagination = (props) => {
    const {queriesPerPage,totalQueries,paginate} = props;
    const pageNums = [];
    for(let i=1;i<=Math.ceil(totalQueries/queriesPerPage);i++){
        pageNums.push(i);
    }
  return (
    <div>
        <ul className="list-none flex space-x-2">
         {pageNums.map((n)=>(
            <li key={n} className='page-item'>
                <a onClick={()=>paginate(n)} className='px-3 py-1 bg-gray-200 transition ease-in-out rounded-md hover:bg-[#EE7214] hover:text-white duration-300 hover:cursor-pointer'>{n}</a>
            </li>
         ))}   
        </ul>
    </div>
  )
}
