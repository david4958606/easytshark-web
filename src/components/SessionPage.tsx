import React, { useState, useEffect } from 'react';
import { Table, TableColumnProps, Pagination } from '@arco-design/web-react';
import { Typography, Tag, Link } from '@arco-design/web-react';
import dayjs from 'dayjs';
import { apiPost } from '../Api.ts';
import { useParams } from 'react-router-dom';

const { Text, Ellipsis } = Typography;

const columns: TableColumnProps[] = [
    {
        title: '会话ID',
        dataIndex: 'session_id',
        width: 80
    },
    {
        title: 'IP1',
        dataIndex: 'ip1',
        width: 150
    },
    {
        title: 'IP1归属地',
        dataIndex: 'ip1_location',
        width: 200
    },
    {
        title: 'IP1端口',
        dataIndex: 'ip1_port',
        width: 100
    },
    {
        title: 'IP2',
        dataIndex: 'ip2',
        width: 150
    },
    {
        title: 'IP2归属地',
        dataIndex: 'ip2_location',
        width: 200
    },
    {
        title: 'IP2端口',
        dataIndex: 'ip2_port',
        width: 100
    },
    {
        title: '会话开始时间',
        dataIndex: 'start_time',
        width: 230,
        render: (value) => {
            const split = value.toString().split('.')
            return (`${dayjs(value * 1000).format('YYYY-MM-DD HH:mm:ss')}.${split[1]}`)
        }
    },
    {
        title: '会话结束时间',
        dataIndex: 'end_time',
        width: 230,
        render: (value) => {
            const split = value.toString().split('.')
            return (`${dayjs(value * 1000).format('YYYY-MM-DD HH:mm:ss')}.${split[1]}`)
        }
    },
    {
        title: '应用协议',
        dataIndex: 'app_proto',
        width: 120
    },
    {
        title: '数据包总大小',
        dataIndex: 'total_bytes',
        width: 120
    },
    {
        title: '数据包总数量',
        dataIndex: 'packet_count',
        width: 120
    },
];


function SessionPage(props) {

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [pageSize, setPageSize] = useState(30);
    const [dataList, setDataList] = useState([])
    const { type } = useParams();

    const loadData = async () => {
        setLoading(true);

        let proto = '';
        if (type === 'tcp') {
            proto = "TCP"
        } else if (type === 'udp') {
            proto = "UDP"
        } else if (type === 'dns') {
            proto = "DNS"
        } else if (type === 'http') {
            proto = "HTTP"
        } else if (type === 'tls') {
            proto = "TLS"
        } else if (type === 'ssh') {
            proto = "SSH"
        }

        const _data = await apiPost('/api/getSessionList', {
            "pageSize": pageSize,
            "pageNum": currentPage,
            "proto": proto
        })
        console.log(_data.data)
        setDataList(_data.data)
        setTotal(_data.total);
        setLoading(false);
    }


    useEffect(() => {
        loadData()
    }, [currentPage, pageSize, type])

    return (
        <div>
            <Table
                columns={columns}
                data={dataList}
                loading={loading}
                pagination={false}
                scroll={{ y: 600 }}
            />
            <Pagination
                current={currentPage}
                showTotal
                sizeCanChange
                total={total}
                pageSize={pageSize}
                onChange={(page) => setCurrentPage(page)}
                onPageSizeChange={(size) => setPageSize(size)}
                style={{ marginTop: 16, textAlign: 'right' }}
            />
        </div>
    )
};

export default SessionPage;