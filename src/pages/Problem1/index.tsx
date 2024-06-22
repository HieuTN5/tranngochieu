import { Card, Col, Typography, InputNumber, Row, Space } from "antd"
import { useState } from "react";
const { Text } = Typography;
const Problem1 = () => {
    const [sumA, setSumA] = useState<number>(0);
    const [sumB, setSumB] = useState<number>(0);
    const [sumC, setSumC] = useState<number>(0);
    const forSum = (n: number) => {
        let sum = 0;
        for (let i = 1; i <= n; i++) {
            sum += i;
        }
        setSumA(sum);
    }

    const mathSum = (n: number) => {
        let sum = 0;
        let i = 1;
        while (i <= n) {
            sum += i;
            i++;
        }
        setSumB(sum);
    }

    const reduceSum = (n: number) => {
        setSumC(Array.from({ length: n }, (_, index) => index + 1).reduce((acc, curr) => acc + curr, 0));
    }
    return <>
        <Card title="THREE WAYS TO SUM TO N">
            <Row>

            </Row>
            <Row gutter={[16, 16]} >
                <Col md={8} sm={24}>
                    <Space>
                        <InputNumber
                            maxLength={5}
                            style={{ width: '100%' }}
                            placeholder="Please Input number for Sum"
                            onChange={(value) => forSum(value as number)} />
                        <Text type="success">Total: {sumA}</Text>
                    </Space>
                    <pre>
                        {` 
    var sum_to_n_a = (n: number) => {
        let sum = 0;
        for (let i = 1; i <= n; i++) {
            sum += i;
        }
        return sum;
    };
`}
                    </pre>
                </Col>
                <Col md={8} sm={24}>
                    <Space>
                        <InputNumber
                            maxLength={5}
                            style={{ width: '100%' }}
                            placeholder="Please Input number for Sum"
                            onChange={(value) => mathSum(value as number)} />
                        <Text type="success">Total: {sumB}</Text>
                    </Space>
                    <pre>
                        {`
var sum_to_n_b = function(n) {
    return n * (n + 1) / 2;
};
`}
                    </pre>
                </Col>
                <Col md={8} sm={24}>
                    <Space>
                        <InputNumber
                            maxLength={5}
                            style={{ width: '100%' }}
                            placeholder="Please Input number for Sum"
                            onChange={(value) => reduceSum(value as number)} />
                        <Text type="success">Total: {sumC}</Text>
                    </Space>
                    <pre>
                        {`
var sum_to_n_c = function(n) {
    return Array.from({ length: n }, 
    (_, index) => index + 1)
    .reduce((acc, curr) => acc + curr, 0);
};
`}
                    </pre>
                </Col>
            </Row>
        </Card>
    </>
}

export default Problem1
