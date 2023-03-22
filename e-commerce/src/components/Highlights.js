import { Row, Col, Card } from 'react-bootstrap';

// export a function
export default function Highlights() {
    return (
    	<Row className="mt-3 mb-3">
        <div>Products</div>
            <Col xs={12} md={4}>
                <Card className="cardHighlight p-3">
                    <Card.Body>
                        <Card.Title>
                            <h2>Sample Products</h2>
                        </Card.Title>
                        <Card.Text>
                            product 1 here
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} md={4}>
                <Card className="cardHighlight p-3">
                    <Card.Body>
                        <Card.Title>
                            <h2>Sample Products</h2>
                        </Card.Title>
                        <Card.Text>
                            product 2 here
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} md={4}>
                <Card className="cardHighlight p-3">
                    <Card.Body>
                        <Card.Title>
                            <h2>Sample Products</h2>
                        </Card.Title>
                        <Card.Text>
                            product 3 here
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}
