import React, { useState, useEffect } from 'react';
import { Table, TableColumnProps, Pagination } from '@arco-design/web-react';
import { Typography, Tag, Link } from '@arco-design/web-react';
import dayjs from 'dayjs';
import { apiPost } from '../Api.ts';
import { useParams } from 'react-router-dom';

const { Text, Ellipsis } = Typography;
// {
//     "region": "中国",
//     "ip_count": 7,
//     "total_packets": 28,
//     "total_bytes": 5140,
//     "session_count": 7
// },
const columns = [
    {
        title: '地区',
        dataIndex: 'region',
        width: 150
    },
    {
        title: 'IP地址数',
        dataIndex: 'ip_count',
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
    }
]

function RegionStats(props) {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [pageSize, setPageSize] = useState(30);
    const [dataList, setDataList] = useState([])
    const { type } = useParams();

    const loadData = async () => {
        setLoading(true);

        const _data = await apiPost('/api/getRegionStatsList', {
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

export default RegionStats;
