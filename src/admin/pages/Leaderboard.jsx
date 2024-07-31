import anlayticsAPILink from "api_link/analytics";
import useLogContext from "hooks/useLogContext";
import { useEffect, useState } from "react";

import '../../styles/pages/leaderboard.css';

const Leaderboard = () =>
{
    const { development } = useLogContext();

    const [loading, setLoading] = useState(false);
    const [leaderboardList, setLeaderboardList] = useState(null);

    const addTimeBonus = (leaderboard_data) =>
    {
        for(const leaderboard_data_point of leaderboard_data)
        {
            const time_bonus = Math.round((1 - (leaderboard_data_point['quiz_length']/1000000))*leaderboard_data_point['score'])
            leaderboard_data_point['time_bonus'] = time_bonus;
            leaderboard_data_point['total_score'] = leaderboard_data_point['score'] + time_bonus;
        }
        setLeaderboardList(leaderboard_data);
    }

    const fetchLeaderboardData = async () =>
    {
        setLoading(true);
        const res = await anlayticsAPILink.getFirstScorePerUserInSection('669efc8e9e87a595eb52b326');
        if(development)
        {
            console.log('GET FIRST SECTION SCORES CALL');
            console.log(res);
        }
        if(res['status'] !== 200)
        {
            const res_errors = await res['data'];
            if(development) console.error(res_errors);
            return;
        }
        const leaderboard_data = await res['data'];
        addTimeBonus(leaderboard_data)
    }

    useEffect(() =>
    {
        fetchLeaderboardData();
    }, []);

    return (
        <div className="leaderboard-page">
            <h2 className="leaderboard-title">Top 5 best scores today!</h2>
            <div className="leaderboard-wrapper">
                <table className="leaderboard-table classroom-leaderboard-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th className="classroom-leaderboard-row">Score</th>
                            <th className="classroom-leaderboard-row">Time Bonus</th>
                            <th className="classroom-leaderboard-row">Total Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            leaderboardList &&
                            leaderboardList
                            .sort((a, b) => b.total_score - a.total_score) // Sort in descending order
                            .slice(0, 5) // Take only the top 5 records
                            .map((record, index) => { return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{record['user_name']}</td>
                                    <td className="classroom-leaderboard-row">{record['score']}</td>
                                    <td className="classroom-leaderboard-row">{record['time_bonus']}</td>
                                    <td className="classroom-leaderboard-row">{record['total_score']}</td>
                                </tr>
                            )}
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Leaderboard;
