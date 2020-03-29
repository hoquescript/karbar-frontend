import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setChipData } from "../../Store/Actions/forms";

import { Tree, Tooltip } from "antd";

const nodeSeparator = params => {
  const node1 = [];
  const node2 = [];
  const node3 = [];
  const node4 = [];
  const node5 = [];
  const node6 = [];
  const node7 = [];
  params.forEach(({ ACode, AHead }) => {
    if (ACode.startsWith("01")) node1.push({ key: ACode, title: AHead });
    if (ACode.startsWith("02")) node2.push({ key: ACode, title: AHead });
    if (ACode.startsWith("03")) node3.push({ key: ACode, title: AHead });
    if (ACode.startsWith("04")) node4.push({ key: ACode, title: AHead });
    if (ACode.startsWith("05")) node5.push({ key: ACode, title: AHead });
    if (ACode.startsWith("06")) node6.push({ key: ACode, title: AHead });
    if (ACode.startsWith("07")) node7.push({ key: ACode, title: AHead });
  });
  return [node1, node2, node3, node4, node5, node6, node7];
};

const levelSeparator = node => {
  let level1 = {};
  const level2 = [];
  const level3 = [];
  const level4 = [];
  const level5 = [];
  const level6 = [];
  const level7 = [];
  node.forEach(nd => {
    switch (nd.key.length) {
      case 2:
        level1 = { ...nd };
        return;
      case 4:
        level2.push(nd);
        return;
      case 7:
        level3.push(nd);
        return;
      case 11:
        level4.push(nd);
        return;
      case 15:
        level5.push(nd);
        return;
      case 19:
        level6.push(nd);
        return;
      case 23:
        level7.push(nd);
        return;
      default:
        return;
    }
  });
  const treeData = {
    ...level1,
    children: level2.map(lv2 => ({
      ...lv2,
      children: level3
        .map(lv3 =>
          lv3.key.startsWith(lv2.key)
            ? {
                ...lv3,
                children: level4
                  .map(lv4 =>
                    lv4.key.startsWith(lv3.key)
                      ? {
                          ...lv4,
                          children: level5
                            .map(lv5 =>
                              lv5.key.startsWith(lv4.key)
                                ? {
                                    ...lv5,
                                    children: level6
                                      .map(lv6 =>
                                        lv6.key.startsWith(lv5.key)
                                          ? {
                                              ...lv6,
                                              children: level7
                                                .map(lv7 =>
                                                  lv7.key.startsWith(lv6.key)
                                                    ? { ...lv7 }
                                                    : null
                                                )
                                                .filter(lvl5 => lvl5)
                                            }
                                          : null
                                      )
                                      .filter(lvl5 => lvl5)
                                  }
                                : null
                            )
                            .filter(lvl5 => lvl5)
                        }
                      : null
                  )
                  .filter(lvl4 => lvl4)
              }
            : null
        )
        .filter(lvl3 => lvl3)
    }))
  };
  return treeData;
};


const TreeView = ({ params }) => {
  const dispatch = useDispatch();
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const nodes = nodeSeparator(params).filter(node => node.length>0);
  const treeData = nodes.map(node => levelSeparator(node));

  const onExpand = expandedKeys => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    console.log("onExpand", expandedKeys); 
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeys, e) => {
    const chipData = e.checkedNodes.map(node => ({key: node.key, label: node.props.title})).filter(cd => !expandedKeys.includes(cd.key))
    dispatch(setChipData(chipData))
    setCheckedKeys(checkedKeys);
  };

  const onSelect = (selectedKeys, info) => {
    console.log("onSelect", selectedKeys, info);
    setSelectedKeys(selectedKeys);
  };

  return (
    <Tooltip placement="bottomLeft">
    <Tree
      checkable
      showLine
      showIcon={false}
      onExpand={onExpand}
      expandedKeys={expandedKeys}
      autoExpandParent={autoExpandParent}
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      onSelect={onSelect}
      selectedKeys={selectedKeys}
      treeData={treeData}
    />
    </Tooltip>
  );
};

export default TreeView;
