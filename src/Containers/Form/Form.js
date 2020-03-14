import React from 'react'
import { Layout, Breadcrumb, Icon } from "antd";
import { useSelector } from "react-redux"

const Headbar = () => {

}

const Form = (props) => {
    const {first, second, third} = useSelector ( state => state.menu.menuPathways )
    return (
        <>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>{first || 'Loading'}</Breadcrumb.Item>
                <Breadcrumb.Item>{second || '...' }</Breadcrumb.Item>
                <Breadcrumb.Item>{third || '...' }</Breadcrumb.Item>
            </Breadcrumb>
            <Layout.Content style={{ background: "#fff", padding: 24, margin: 0, maxHeight: 800 }}>
                <Headbar type={second} title = {third} subtitle = {first}/>
                {props.children}
            </Layout.Content>
        </>
    )
}

export default Form
