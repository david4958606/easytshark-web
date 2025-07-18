import React, { useState, useEffect } from 'react';
import { Table, TableColumnProps, Pagination } from '@arco-design/web-react';
import { Typography, Tag, Link } from '@arco-design/web-react';
import dayjs from 'dayjs';
import { apiPost } from '../Api.ts';
import { useParams } from 'react-router-dom';

const { Text, Ellipsis } = Typography;
const columns = [
    // {
    //     "protocol": "TCP",
    //     "total_packets": 116,
    //     "total_bytes": 19926,
    //     "session_count": 15,
    //     "proto_desc": "传输控制协议，构建在IP之上，提供可靠、有序、无差错的数据传输，并具备流量与拥塞控制能力。"
    //   }
    {
        title: '协议',
        dataIndex: 'protocol',
        width: 150
    },
    {
        title: '数据包数',
        dataIndex: 'total_packets',
        width: 150
    },
    {
        title: '数据量',
        dataIndex: 'total_bytes',
        width: 150
    },
    {
        title: '会话数',
        dataIndex: 'session_count',
        width: 150
    },
    {
        title: '协议描述',
        dataIndex: 'proto_desc',
    }
];

function ProtoStats(props) {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [pageSize, setPageSize] = useState(30);
    const [dataList, setDataList] = useState([])
    const { type } = useParams();

    const loadData = async () => {
        setLoading(true);

        const _data = await apiPost('/api/getProtoStatsList', {
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
}

export default ProtoStats;
