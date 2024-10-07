import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const softwareApplications = [
  {
    name: "Software1",
    icon: "Icon1",
  },
  {
    name: "Software2",
    icon: "Icon2",
  },
  {
    name: "Software3",
    icon: "Icon3",
  },
];

const Test = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="min-w-[1000px] border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="md:table-cell">Icon</TableHead>
              <TableHead className="text-center w-1 max-w-[max-content]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {softwareApplications && softwareApplications.length > 0 ? (
              softwareApplications.map((software, index) => (
                <TableRow key={index} className="bg-accent">
                  <TableCell>{software.name}</TableCell>
                  <TableCell>{software.icon}</TableCell>
                  <TableCell className="text-center w-1 max-w-[max-content]">
                    <Button>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="text-3xl overflow-y-hidden">
                  You have not added any software yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Test;


// <Table>
//                               <TableHeader>
//                                  <TableRow>
//                                     <TableHead>Name</TableHead>
//                                     <TableHead className='md:table-cell'>
//                                        Icon
//                                     </TableHead>
//                                     <TableHead className='text-right w-auto'>Action</TableHead>
//                                  </TableRow>
//                               </TableHeader>
//                               <TableBody>
//                                  {softwareApplications &&
//                                  softwareApplications.length > 0 ? (
//                                     softwareApplications.map((software) => (
//                                        <TableRow
//                                           className='bg-accent'
//                                           key={software._id}
//                                        >
//                                           <TableCell>{software.name}</TableCell>
//                                           <TableCell>
//                                              <img
//                                                 src={software?.svg?.url}
//                                                 alt={software.name}
//                                                 className='w-7 h-7'
//                                              />
//                                           </TableCell>
//                                           <TableCell className='text-right w-auto'>
//                                             {
//                                               loading && appId === software._id ? (
//                                                 <SpecialLoadingButton content={'Deleting'} width={'w-fit'} />
//                                               ) : (
//                                              <Button onClick={() => handleDeleteSoftwareApp(software._id)}>Delete</Button>
//                                               )
//                                             }
//                                           </TableCell>
//                                        </TableRow>
//                                     ))
//                                  ) : (
//                                     <TableRow>
//                                        <TableCell className='text-3xl overflow-y-hidden'>
//                                           You have not added any softwares yet.
//                                        </TableCell>
//                                     </TableRow>
//                                  )}
//                               </TableBody>
//                            </Table>