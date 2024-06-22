import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Row, Col, Typography } from 'antd';
import _ from 'lodash';
import { getTokenPricesService } from "../../services/token.service";
import ConfirmModal from "./components/ModalComponent";
import './styles.scss'


const { Option } = Select;
const { Text } = Typography;
export interface Token {
    currency: string;
    price: number;
}

const Problem2 = () => {
    const [form] = Form.useForm();
    const [tokenData, setTokenData] = useState<Token[]>([]);
    const [fromCurrency, setFromCurrency] = useState<string>('bNEO');
    const [toCurrency, setToCurrency] = useState<string>('GMX');
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const filterUniqueData = (data: Token[]): Token[] => {
        const sortedData = _.sortBy(data, ['currency', 'price']);
        const uniqueData = _.uniqBy(sortedData, 'currency');
        return uniqueData;
    };

    const getTokenPrices = async () => {
        try {
            const response = await getTokenPricesService();
            const uniqueData = filterUniqueData(response.data);
            setTokenData(uniqueData);
        } catch (error) {
            console.error('Error fetching token data:', error);
            return {};
        }
    };

    useEffect(() => {
        getTokenPrices();
    }, []);


    const handleExchangeRate = (flag: boolean) => {
        const { fromCurrency, toCurrency, fromQty, toQty } = form.getFieldsValue()
        const fromToken = tokenData.find(token => token.currency === fromCurrency);
        const toToken = tokenData.find(token => token.currency === toCurrency);
        if (fromToken && toToken) {
            if (fromQty && flag) {
                form.setFieldsValue({ toQty: ((fromQty * fromToken.price) / toToken.price).toFixed(2) });
            } else if (toQty && !flag) {
                form.setFieldsValue({ fromQty: ((toQty * toToken.price) / fromToken.price).toFixed(2) });
            }
        }
    };

    useEffect(() => {
        const fromToken = tokenData.find(token => token.currency === fromCurrency);
        const toToken = tokenData.find(token => token.currency === toCurrency);
        const toQty = form.getFieldValue('toQty');
        if (fromToken && toToken)
            form.setFieldsValue({ fromQty: ((toQty * toToken.price) / fromToken.price).toFixed(2) });
    }, [fromCurrency]);

    useEffect(() => {
        const fromToken = tokenData.find(token => token.currency === fromCurrency);
        const toToken = tokenData.find(token => token.currency === toCurrency);
        const fromQty = form.getFieldValue('fromQty');
        if (fromToken && toToken)
            form.setFieldsValue({ toQty: ((fromQty * fromToken.price) / toToken.price).toFixed(2) });
    }, [toCurrency]);

    const onFinish = () => {
        setIsOpenModal(true);
    };

    return (
        <div className="problem2">
            <Row justify="center" align="middle" >
                <Col xs={24} sm={20} md={16} lg={12} xl={10} xxl={8}
                    className="form">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{
                            fromCurrency: fromCurrency,
                            toCurrency: toCurrency,
                            fromQty: '',
                            toQty: '',
                        }}
                    >
                        <Form.Item
                            name="fromCurrency"
                            label="Source Currency"
                            rules={[{ required: true, message: 'Please select source currency' }]}
                        >
                            <Select placeholder="Select currency" onChange={(value) => setFromCurrency(value)}>
                                {tokenData.map((token: any, index: number) => (
                                    <Option key={index} value={token.currency}>
                                        <span className="label-select">
                                            <img src={require(`/public/images/${token.currency}.svg`)}
                                                alt={token.currency}
                                                loading="lazy" />
                                            {token.currency.toUpperCase()}
                                            <Text type="warning" className="price">{token.price.toFixed(2)}</Text>
                                        </span>
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="fromQty"
                            label="Quanlity"
                            rules={[
                                { required: true, message: 'Please enter Quanlity' },
                                {
                                    pattern: /^(?!0(\.0+)?$)(\d+(\.\d+)?$)/,
                                    message: 'The number must be greater than 0',
                                },
                            ]}
                        >
                            <Input type="number" placeholder="Enter Quanlity" onChange={(e) => {
                                if (+e.target.value < 0) return;
                                handleExchangeRate(true)
                            }} />
                        </Form.Item>
                        <Form.Item
                            name="toCurrency"
                            label="Destination Currency"
                            rules={[{ required: true, message: 'Please select destination currency' }]}
                        >
                            <Select placeholder="Select currency" onChange={(value) => setToCurrency(value)}>
                                {tokenData.map((token, index) => (
                                    <Option key={index} value={token.currency}>
                                        <span className="label-select">
                                            <img style={{ height: 20, marginRight: 10 }} src={require(`/public/images/${token.currency}.svg`)}
                                                alt={token.currency}
                                                loading="lazy" />
                                            {token.currency.toUpperCase()}
                                            <Text type="warning" className="price">{token.price.toFixed(2)}</Text>
                                        </span>
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="toQty"
                            label="Quanlity"
                            rules={[
                                { required: true, message: 'Please enter Quanlity' },
                                {
                                    pattern: /^(?!0(\.0+)?$)(\d+(\.\d+)?$)/,
                                    message: 'The number must be greater than 0',
                                },
                            ]}
                        >
                            <Input type="number" placeholder="Enter Quanlity" onChange={(e) => {
                                if (+e.target.value < 0) return;
                                handleExchangeRate(false)
                            }} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="btn_submit">Submit</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <ConfirmModal
                isOpen={isOpenModal}
                handleCancel={() => setIsOpenModal(false)}
                handleOk={() => setIsOpenModal(false)}
                fromCurrency={fromCurrency}
                toCurrency={toCurrency}
                fromQty={form.getFieldValue('fromQty')}
                toQty={form.getFieldValue('toQty')}
                listCurency={tokenData}
            />
        </div>

    );
}

export default Problem2;
