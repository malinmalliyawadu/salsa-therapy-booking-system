export const ClassTimetableRowHeader: React.FC = ({ children }) => {
  return (
    <div className="p-4 font-bold border-b bg-gradient-to-r from-purple-100 to-purple-50 border-purple-500 uppercase text-purple-900">
      {children}
    </div>
  );
};
