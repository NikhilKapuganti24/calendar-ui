import React, { useEffect, useRef, useState } from 'react';

interface TableComponentProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
  itemsPerPage: number;
  onEdit: (id: any) => void;
  onDelete: (id: any) => void;
}

const Table = <T extends { learningStatus: any; _id: string }>({
  data,
  columns,
  itemsPerPage,
  onEdit,
  onDelete,
}: TableComponentProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [activeEditId, setActiveEditId]: any = useState(null);
  const editBlockRef = useRef<HTMLDivElement>(null);

  const sortedData = data.slice().sort((a, b) => {
    if (!sortBy) return 0;
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, sortOrder, searchTerm]);

  const filteredData = sortedData.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const toggleEditBlock = (id: string) => {
    if (activeEditId === id) {
      setActiveEditId(null);
    } else {
      setActiveEditId(id);
    }
  };
  const toggleDeleteBlock = (id: string) => {
    if (activeEditId === id) {
      setActiveEditId(null);
    } else {
      setActiveEditId(id);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (editBlockRef.current && !editBlockRef.current.contains(event.target as Node)) {
      setActiveEditId(null);
    }
  };

  const getLearningStatusStyles = (status: string) => {
    switch (status) {
      case 'Inprogress':
        return { backgroundColor: '#FFD27B', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '4px', border: '1px solid #FFD27B' };
      case 'Completed':
        return { backgroundColor: '#88FFB0', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '4px', border: '1px solid #88FFB0' };
      case 'Notenrolled':
        return { backgroundColor: '#FFA8A8', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '4px', border: '1px solid #FFA8A8' };
      default:
        return {};
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} onClick={() => {
                setSortBy(col.key);
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              }}>
                {col.label}
              </th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item._id} style={{ position: 'relative' }}>
              {columns.map((col) => (
                <td key={`${item._id}-${String(col.key)}`}>
                  {col.key === 'learningStatus' ? (
                    <div style={getLearningStatusStyles(item.learningStatus)}>
                      {item.learningStatus}
                    </div>
                  ) : (
                    String(item[col.key])
                  )}
                </td>
              ))}
              <td className="cursor" style={{ position: 'relative' }}>
                <img
                  src="./action.svg"
                  alt=""
                  className="editIcon"
                  onClick={() => toggleEditBlock(item._id)}
                />
                
                {activeEditId === item._id && (
                  <div ref={editBlockRef} className="absolute edit-block py-2 px-4 bg-white rounded-lg shadow-2xl bordercolor card" style={{ top: '100%', right: '0', zIndex: 10 }}>
                    <div className="flex block px-4 py-2 text-gray-800 cursor-pointer wrapper" onClick={() => { onEdit(item._id); setActiveEditId(null); }}>
                      <div className="logout-text">Edit</div>
                    </div>
                    <div className="flex block px-4 py-2 text-gray-800 cursor-pointer wrapper" onClick={() => { onDelete(item._id); setActiveEditId(null); }}>
                      <div className="logout-text">Delete</div>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination mt-2">
        {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)} className={index + 1 === currentPage ? 'active' : ''}>
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Table;
