import React from 'react';
import {Card, Col, Row} from 'reactstrap';
import ModalForm from '../Modals/Modal';

function UserList(props) {
  const items = props.items.map(item => {
    return (
      <Row key={item.id}>
        <Col key={item.id}>
          <Card body style={{flexDirection: 'row', margin: '20px', lineHeight: '30px'}}>
            {item.name}
            <div style={{width: "110px"}} key={item.id}>
              <ModalForm buttonLabel="Edit" item={item} updateState={props.updateState}/>
            </div>
          </Card>
        </Col>
      </Row>
    )
  });

  return (
    <Row>
      {items}
    </Row>
  )
}

export default UserList
