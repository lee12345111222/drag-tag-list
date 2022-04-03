import React from "react";
import * as ReactDOM from 'react-dom/client';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import './style.scss';
const entityVals  ={
  "businessId": "1f8fce45545d440583ca79786b6b0fe0",
  "open": false,
  "itemVOList": [
      {
          "id": 91,
          "businessId": "1f8fce45545d440583ca79786b6b0fe0",
          "thresholdItem": "height",
          "open": false,
          "maxValve": 0,
          "minValve": 0,
          "priority": 0,
          "code": "height",
          "name": "身高",
          "enumCode": null,
          "unit": "cm"
      },
      {
          "id": 92,
          "businessId": "1f8fce45545d440583ca79786b6b0fe0",
          "thresholdItem": "weight",
          "open": false,
          "maxValve": 0,
          "minValve": 0,
          "priority": 1,
          "code": "weight",
          "name": "体重",
          "enumCode": null,
          "unit": "kg"
      },
      {
          "id": 93,
          "businessId": "1f8fce45545d440583ca79786b6b0fe0",
          "thresholdItem": "bust",
          "open": false,
          "maxValve": 0,
          "minValve": 0,
          "priority": 2,
          "code": "bust",
          "name": "胸围",
          "enumCode": null,
          "unit": "cm"
      }
  ]
}
export default function Drag(props) {
  const {submit} = props
  const SortContainer = SortableContainer(props => <div className="Tags" ><div {...props}></div></div>);
  const SortItem = SortableElement(props => <div className="Tag"><div  {...props}></div></div>);
  const onSortEnd = ({ oldIndex, newIndex }) => {
    console.log(oldIndex, newIndex);
    let itemVOList = [...entityVals.itemVOList];
    let temp = { ...itemVOList[oldIndex], priority: newIndex };
    itemVOList[oldIndex] = { ...itemVOList[newIndex], priority: oldIndex };
    itemVOList[newIndex] = temp;
    submit({ ...entityVals, itemVOList })
  };
  const handleSortClick = (idx, e) => {
    e.stopPropagation();
    let itemVOList = [...entityVals.itemVOList];
    itemVOList[idx] = { ...itemVOList[idx], open: !!!itemVOList[idx].open };
    let status = 0;
    itemVOList?.forEach(ele => {
      if (ele.open === true) {
        status = 1;
      }
    });
    if (status === 0) {
      entityVals.open = false;
    }
    submit({ ...entityVals, itemVOList })
  };
  const renderTags = () => {
    return entityVals?.itemVOList?.map((item, i) => {
      const isOpen =
        typeof item.open === 'boolean' ? item.open : item.open === 'true';
      return (
        <span onClick={e => handleSortClick(i, e)}>
          <SortItem className={isOpen ? 'open' : ''} key={item.name} index={i}>
            {item.name}
          </SortItem>
        </span>
      );
    });
  };
  const renderGreater = () => {
    return entityVals?.itemVOList?.map((v, i) =>
      i + 1 < entityVals?.itemVOList.length ? (
        <span className="greater">{v.name}</span>
      ) : null,
    );
  };
  return <div className="Drag">
  <SortContainer
    pressDelay={200}
    axis="x"
    onSortEnd={onSortEnd}
    disableAutoscroll
  >
    {renderTags()}
  </SortContainer>
  <div className="greater-wrap">{renderGreater()}</div>
</div>;
}

ReactDOM.createRoot(document.getElementById("container")).render(<Drag/>);
