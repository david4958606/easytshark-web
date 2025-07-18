import React, { useState, useEffect } from 'react';
import { Table, TableColumnProps, Pagination } from '@arco-design/web-react';
import { Typography, Tag, Link } from '@arco-design/web-react';
import dayjs from 'dayjs';
import { apiPost } from '../Api.ts';
import { useParams } from 'react-router-dom';

const { Text, Ellipsis } = Typography;

const columns = [
  {
    title: '序号',
    dataIndex: 'frame_number',
    width: 80
  },
  {
    title: '时间',
    dataIndex: 'timestamp',
    width: 230,
    render: (value) => {
      const split = value.toString().split('.')
      return (`${dayjs(value * 1000).format('YYYY-MM-DD HH:mm:ss')}.${split[1]}`)
    }
  },
  {
    title: '源IP',
    dataIndex: 'src_ip',
    width: 150
  },
  {
    title: '源IP归属地',
    dataIndex: 'src_location',
    width: 200
  },
  {
    title: '源端口',
    dataIndex: 'src_port',
    width: 100
  },
  {
    title: '目的IP',
    dataIndex: 'dst_ip',
    width: 150
  },
  {
    title: '目的IP归属地',
    dataIndex: 'dst_location',
    width: 200
  },
  {
    title: '目的端口',
    dataIndex: 'dst_port',
    width: 100
  },
  {
    title: '数据包大小',
    dataIndex: 'len',
    width: 150
  },
  {
    title: '协议',
    dataIndex: 'protocol',
    width: 120
  },
  {
    title: '信息',
    dataIndex: 'info',
    width: 350
  },
];


function DataPacketPage(props) {

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
    } else if (type === 'icmp') {
      proto = "ICMP"
    } else {
      proto = ""
    }

    const _data = await apiPost('/api/getPacketList', {
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

export default DataPacketPage;