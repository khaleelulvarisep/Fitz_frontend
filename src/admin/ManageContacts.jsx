







// import React, { useContext } from "react";
// import { AdminContext } from "../context/AdminContext";
// import { FaTrash } from "react-icons/fa";
// import { toast } from "react-toastify";

// function ManageContacts() {
//   const { contacts, deleteContact } = useContext(AdminContext);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this contact?")) {
//       try {
//         await deleteContact(id);
//         toast.success("Contact deleted successfully");
//       } catch (error) {
//         toast.error("Failed to delete contact");
//       }
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold text-sky-700 mb-4">Manage Contacts</h2>
//       {contacts.length === 0 ? (
//         <p>No contacts available.</p>
//       ) : (
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-sky-100 text-sky-700">
//               <th className="p-2 border">Name</th>
//               <th className="p-2 border">Email</th>
//               <th className="p-2 border">Message</th>
//               <th className="p-2 border">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {contacts.map((contact) => (
//               <tr key={contact.id} className="border text-center">
//                 <td className="p-2 border">{contact.name}</td>
//                 <td className="p-2 border">{contact.email}</td>
//                 <td className="p-2 border">{contact.message}</td>
//                 <td className="p-2 border">
//                   <button
//                     onClick={() => handleDelete(contact.id)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                   >
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default ManageContacts;







import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

function ManageContacts() {
  const { contacts, deleteContact } = useContext(AdminContext);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await deleteContact(id);
        toast.success("Contact deleted ");
      } catch (error) {
        toast.error("Failed to delete contact");
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-sky-700 mb-8 text-center">
        Manage Contacts
      </h2>

      {contacts.length === 0 ? (
        <div className="flex flex-col items-center mt-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No contacts"
            className="w-32 opacity-70 mb-4"
          />
          <p className="text-gray-500 text-lg">No contacts available</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition hover:scale-105"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-sky-700">
                  {contact.name}
                </h3>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="text-red-500 hover:text-red-600 transition text-lg"
                  title="Delete Contact"
                >
                  <FaTrash />
                </button>
              </div>

              <p className="text-gray-500 mt-1">{contact.email}</p>
              <p className="mt-4 text-gray-700">{contact.message}</p>

              <div className="mt-4 flex justify-end gap-2">
                <span className="text-gray-400 text-sm">
                  {new Date(contact.date).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageContacts;
