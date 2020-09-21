import React, { useState, useEffect } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';
import { getLocations, updateLocation, deleteLocation } from './location.api';
import AddLocation from './AddLocation';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const LocationsTable = () => {
  const [locationList, setLocations] = useState([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  
  useEffect(() => {
      let mounted = true;
      getLocations().then( ( data ) => {
          if(mounted) {
              setLocations(data)
          }
      });
      return () => {
          mounted = false;
      };
  }, []);
  
    const isEditing = record => record.id === editingKey;

    const onChange = (pagination, filters, sorter, extra) => {

      if(sorter.field) {
        let newList = [...locationList];
        if(sorter.order === "ascend") {
          newList = newList.sort((a, b) => a[sorter.field] - b[sorter.field] || a[sorter.field].localeCompare(b[sorter.field]))
        } else {
          newList = newList.sort((a, b) => b[sorter.field] - a[sorter.field] ||  b[sorter.field].localeCompare(a[sorter.field]))
        }

        setLocations(newList);
      }
        
      
    }

  const edit = record => {
    form.setFieldsValue({...record});
    setEditingKey(record.id);
  };

  const cancel = () => setEditingKey('');

  const save = async id => {
    try {
      const row = await form.validateFields();
      const newData = [...locationList];
      const index = newData.findIndex(item => id === item.id);

      updateLocation({
        id,
        ...row,
      })

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setLocations(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setLocations(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const deleteFromList = (locationId) => {
    deleteLocation(locationId).then(() => {
        const newList = [...locationList].filter(location => location.id !== locationId);
        setLocations(newList)
    });
  }

  const columns = [
    {
      title: 'Zone',
      dataIndex: 'zone',
      editable: true,
      sorter: (a, b) => a.drink - b.drink,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'drink',
      dataIndex: 'drink',
      editable: true,
      sorter: (a, b) => a.drink - b.drink,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'country',
      dataIndex: 'country',
      editable: true,
      sorter: (a, b) => a.drink - b.drink,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'city',
      dataIndex: 'city',
      editable: true,
      sorter: (a, b) => a.drink - b.drink,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'note',
      dataIndex: 'note',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <span
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </span>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <span>Cancel</span>
            </Popconfirm>
          </span>
        ) : (
            <>
          <span 
            disabled={editingKey !== ''} 
            onClick={() => edit(record)}
            style={{
                marginRight: 8,
              }}
            >
            Edit
          </span>
          <Popconfirm title="Sure to Delete?" onConfirm={() => deleteFromList(record.id)}>
          <span disabled={editingKey !== ''}>
            Delete
          </span>
        </Popconfirm>
        </>
        );
      },
    },
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'zone' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  let data = [...locationList];

  return (
    <>
      <AddLocation 
        locationList={locationList}
        setLocations={setLocations}
      />
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          onChange={onChange}
          pagination={{
            onChange: cancel,
            pageSize: 100
          }}
        />
      </Form>
    </>
  );
};

export default LocationsTable;