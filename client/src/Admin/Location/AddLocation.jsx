import React from 'react';
import { Form, Input, Button } from 'antd';

import { addLocationData } from './location.api'

const AddLocation = (props) => {

    const {locationList, setLocations} = props;
    const [form] = Form.useForm();

    const onFinish = values => {
        const {zone, drink, country, city, note} = values;
        const addRow = {
            zone,
            drink,
            country,
            city,
            note
        };
        addLocationData(addRow)
        let newList = [...locationList];
        newList.push(addRow)
        setLocations(newList)
      };
  
    return (
      <>
        <Form
          layout={'inline'}
          form={form}
          initialValues={{ layout: 'inline' }}
          onFinish={onFinish}
        >
          <Form.Item name="zone" label="Zone">
            <Input placeholder="GMT Zone (-12)" />
          </Form.Item>
          <Form.Item name="drink" label="Drink">
            <Input placeholder="Name of Drink" />
          </Form.Item>
          <Form.Item name="country" label="Country">
            <Input placeholder="Country of Origin" />
          </Form.Item>
          <Form.Item name="city" label="City">
            <Input placeholder="City of Origin" />
          </Form.Item>
          <Form.Item name="note" label="Note">
            <Input placeholder="Notes..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    );
}

export default AddLocation;
