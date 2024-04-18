import './style.css';
import {message, Table, TableProps } from "antd";
import GameDto from "../../dto/GameDto";
import {useEffect, useState} from "react";
import FilterDto from "../../dto/FilterDto";
import leaderboardService from "../../service/LeaderboardService";

const columns: TableProps<GameDto>['columns'] = [
    {
        title: 'Username',
        dataIndex: 'username',
        width: "18%",
        sorter: true
    },
    {
        title: 'Level',
        dataIndex: 'level',
        width: "10%",
        sorter: true
    },
    {
        title: 'Total Score',
        dataIndex: 'totalScore',
        width: "15%",
        sorter: true
    },
    {
        title: 'Best Time',
        dataIndex: 'bestTime',
        width: "12%",
        sorter: true
    },
    {
        title: 'Worst Time',
        dataIndex: 'worstTime',
        width: "15%",
        sorter: true
    },
    {
        title: 'Highest Score',
        dataIndex: 'highestScore',
        width: "15%",
        sorter: true
    },
    {
        title: 'Lowest Score',
        dataIndex: 'lowestScore',
        width: "15%",
        sorter: true
    },
];

function Leaderboard() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState<FilterDto>({
        page: 1,
        size: 10,
        sortField: "user.username",
        sortOrder: "DESC"
    });
    const [pagination, setPagination] = useState({
        current: 1,
        defaultCurrent: 0,
        pageSize: 10,
        total: 0
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTableData();
    },[filter]);

    const fetchTableData = () => {
        setLoading(true);
        leaderboardService.getTableData(filter).then(res => {
            if (200 === res.status) {
                let paginationDto: any = {...pagination};
                paginationDto.total = res.data.total;
                setPagination(paginationDto);
                setData(res.data.gameDtoList);
                setLoading(false);
            } else {
                message.error("Internal Server Error").then()
            }
        }).catch(() =>
            message.error("Internal Server Error").then()
        );
    }

    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
        let filterDto: FilterDto = {...filter};
        filterDto.page = pagination.current;
        filterDto.sortField = getSortField(sorter.field);
        filterDto.sortOrder = getSortOrder(sorter.order);
        filterDto.size = pagination.pageSize;
        setPagination(pagination);
        setFilter(filterDto);
    };

    const getSortField = (field: string) => {
        if ("username" === field) {
            return "user.username";
        } else {
            return field ?? "user.username";
        }
    }

    const getSortOrder = (order: string) => {
        if ("ascend" === order) {
            return "ASC";
        } else {
            return "DESC";
        }
    }

    return (
        <>
            <div className="layout-content-leaderboard">
                <div className={"leaderboard-img-div"}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        scroll={{y: 300}}
                        size="large"
                        sortDirections={['ascend' , 'descend' , 'ascend']}
                        rowKey={record => record.key!}
                        onChange={handleTableChange}
                        pagination={pagination}
                        loading={loading}
                        className="table"
                    />
                </div>
            </div>
        </>
    );
}

export default Leaderboard;
