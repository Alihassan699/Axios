import React, { useState, useEffect, ChangeEvent } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import axios from 'axios';
import './App.css';

interface Post {
  id: number;
  title: string;
  body: string;
}

const App: React.FC = () => {
  const columns: TableColumn<Post>[] = [
    {
      name: 'ID',
      selector: (row: Post) => row.id,
      sortable: true,
    },
    {
      name: 'Title',
      selector: (row: Post) => row.title,
      sortable: true,
    },
    {
      name: 'Body',
      selector: (row: Post) => row.body,
      sortable: true,
    },
    {
      name: 'Edit/Delete',
      cell: (row: Post) => (
        <div>
          <button
            onClick={() => handleEdit(row.id)}
            className="mr-2 p-1 bg-blue-500 text-white rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const [data, setData] = useState<Post[]>([]);
  const [filteredData, setFilteredData] = useState<Post[]>([]);
  const [isError, setIsError] = useState<string>('');
  const [country, setCountry] = useState<string>('');

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => setIsError(error.message));
  }, []);

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filtered = data.filter(row =>
      row.title.toLowerCase().includes(value) ||
      row.body.toLowerCase().includes(value) ||
      row.id.toString().includes(value)
    );
    setFilteredData(filtered);
  };

  const handleEdit = (id: number) => {
    console.log('Edit row with id:', id);
  };

  const handleDelete = (id: number) => {
    const updatedData = data.filter(row => row.id !== id);
    setData(updatedData);
    setFilteredData(updatedData);
  };

  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
    console.log('Selected country:', e.target.value);
  };

  return (
    <div className="container mt-5">
      <h1>Axios with APIs</h1>
      {isError && <h2 className="text-red-500">{isError}</h2>}
      <div className="text-end mb-1">
        <input
          type="text"
          placeholder="Filter..."
          className="p-2 border border-gray-300 rounded"
          onChange={handleFilter}
        />
      </div>
      <div className="justify-content-center d-flex">
        <div className="w-5 mt-5">
          <select className="form-control" value={country} onChange={handleCountryChange}>
            <option value="">--Title--</option>
            <option value="Ali">Ali</option>
            <option value="Umar">Umar</option>
            <option value="Asad">Asad</option>
          </select>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        selectableRows
        pagination
      />
    </div>
  );
}

export default App;
