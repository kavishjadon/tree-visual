import { useState } from "react";
import { Button, Card, CardBody, CardHeader, Input } from "reactstrap";

function App() {
  const [tree, setTree] = useState({
    name: "root",
    data: "",
  });

  const treeCopy = JSON.parse(JSON.stringify(tree));

  const addChild = (node) => {
    if (!node.children) node.children = [];
    let n = node.children.length;
    delete node.data;
    node.children.push({ name: `child${n + 1}`, data: "" });
    setTree(JSON.parse(JSON.stringify(treeCopy)));
  };

  const addData = (node, data) => {
    node.data = data;
    setTree(JSON.parse(JSON.stringify(treeCopy)));
  };

  const renderChildren = (node) => {
    return (
      <Card className="my-1" key={node.name}>
        <CardHeader className="d-flex justify-content-between align-items-center">
          <div>{node.name}</div>
          <Button size="sm" color="primary" outline onClick={() => addChild(node)}>
            Add Child
          </Button>
        </CardHeader>
        <CardBody>
          {node.children && node.children.length > 0 ? (
            node.children.map((el) => renderChildren(el))
          ) : (
            <Input onChange={(e) => addData(node, e.target.value)} value={node.data} />
          )}
        </CardBody>
      </Card>
    );
  };

  return (
    <div className="container mt-4">
      {renderChildren(treeCopy)}
      <Card className="mt-4">
        <CardBody>
          <pre>{JSON.stringify(treeCopy, null, 2)}</pre>
        </CardBody>
      </Card>
    </div>
  );
}

export default App;
