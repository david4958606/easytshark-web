import React, { useState, useEffect } from 'react';
import { Table, TableColumnProps, Pagination } from '@arco-design/web-react';
import { Typography, Tag, Link } from '@arco-design/web-react';
import dayjs from 'dayjs';
import { apiPost } from '../Api.ts';
import { useParams } from 'react-router-dom';

const { Text, Ellipsis } = Typography;

const columns = [
    // {
    //     "ip": "102.215.57.63",
    //     "location": "非洲地区",
    //     "proto": "UDP",
    //     "ports": [
    //       60084
    //     ],
    //     "earliest_time": 1752809157.332775,
    //     "latest_time": 1752809157.333102,
    //     "total_send_packets": 1,
    //     "total_recv_packets": 1,
    //     "total_send_bytes": 140,
    //     "total_recv_bytes": 345,
    //     "tcp_session_count": 0,
    //     "udp_session_count": 1
    //   },
    {
        title: 'IP地址',
        dataIndex: 'ip',
        width: 150
    },
    {
        title: '归属地',
        dataIndex: 'location',
        width: 200
    },
    {
        title: '协议',
        dataIndex: 'proto',
        width: 150
    },
    {
        title: '端口',
        dataIndex: 'ports',
        width: 150,
        render: (value) => {
            return value.join(',')
        }
    },
    {
        title: '最早时间',
        dataIndex: 'earliest_time',
        width: 230,
        render: (value) => {
            const split = value.toString().split('.')
            return (`${dayjs(value * 1000).format('YYYY-MM-DD HH:mm:ss')}.${split[1]}`)
        }
    },
    {
        title: '最晚时间',
        dataIndex: 'latest_time',
        width: 230,
        render: (value) => {
            const split = value.toString().split('.')
            return (`${dayjs(value * 1000).format('YYYY-MM-DD HH:mm:ss')}.${split[1]}`)
        }
    },
    {
        title: '发送数据包数',
        dataIndex: 'total_send_packets',
        width: 150
    },
    {
        title: '接收数据包数',
        dataIndex: 'total_recv_packets',
        width: 150
    },
    {
        title: '发送数据量',
        dataIndex: 'total_send_bytes',
        width: 150
    },
    {
        title: '接收数据量',
        dataIndex: 'total_recv_bytes',
        width: 150
    },
    {
        title: 'TCP会话数',
        dataIndex: 'tcp_session_count',
        width: 150
    },
    {
        title: 'UDP会话数',
        dataIndex: 'udp_session_count',
        width: 150
    },
];


function IpStats(props) {

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [pageSize, setPageSize] = useState(30);
    const [dataList, setDataList] = useState([])
    const { type } = useParams();

    const loadData = async () => {
        setLoading(true);

        const _data = await apiPost('/api/getIPStatsList', {
            "pageSize": pageSize,
            "pageNum": currentPage
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

export default IpStats;