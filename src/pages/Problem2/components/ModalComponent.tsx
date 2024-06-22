import { FC } from 'react';
import { Button, Card, Col, Modal, Row, Typography } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons'
import '../styles.scss';
import { Token } from '..';
type TConfirmModal = {
  isOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  fromCurrency: string;
  fromQty: number;
  toCurrency: string;
  toQty: number;
  listCurency: Token[]
};
const { Text } = Typography;
const ConfirmModal: FC<TConfirmModal> = ({
  isOpen,
  handleCancel,
  handleOk,
  fromCurrency,
  fromQty,
  toCurrency,
  toQty,
  listCurency
}) => {
  return (
    <Modal
      title={<Text type="warning" className="title-modal">CONFIRM</Text>}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      closable={false}
      className='modal-confirm'
      footer={
        <Row gutter={[24, 12]} className="full-width">
          <Col md={12} style={{ paddingLeft: 0 }}>
            <Button className="full-width" type='primary' danger onClick={() => handleCancel()}>
              Cancel
            </Button>
          </Col>
          <Col md={12} style={{ paddingRight: 0 }}>
            <Button
              className="btn_submit"
              type="primary"
              onClick={() => handleOk()}
            >
              Confirm
            </Button>
          </Col>
        </Row>
      }
    >
      <br />
      <Card className='from-card'>
        <p className='currency-info'>
          <span className='curency-name'>Currency:
            <img src={require(`/public/images/${fromCurrency}.svg`)} alt={fromCurrency} /> {' '} {fromCurrency.toUpperCase()}
          </span>
          <span>Price: <Text type="warning">{listCurency.find(token => token.currency === fromCurrency)?.price?.toFixed(2)}</Text></span>
          <span>Quanlity: <Text type="success">{fromQty}</Text></span>
        </p>
      </Card>
      <br />
      <ArrowDownOutlined className='icon-arrow' />
      <br />
      <Card className='to-card'>
        <p className='currency-info'>
          <span className='curency-name'>Currency:
            <img src={require(`/public/images/${toCurrency}.svg`)} alt={fromCurrency} />  {' '}{toCurrency.toUpperCase()}</span>
          <span>Price: <Text type="warning">{listCurency.find(token => token.currency === toCurrency)?.price?.toFixed(2)}</Text></span>
          <span>Quanlity:  <Text type="success">{toQty}</Text></span>
        </p>
      </Card>
      <br />
    </Modal>
  );
};

export default ConfirmModal;
