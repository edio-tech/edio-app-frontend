import anlayticsAPILink from "api_link/analytics";
import useLogContext from "hooks/useLogContext";
import { useEffect, useState } from "react";

import '../../styles/pages/leaderboard.css';

const Leaderboard = () =>
{
    const { development } = useLogContext();

    const [loading, setLoading] = useState(false);
    const [leaderboardList, setLeaderboardList] = useState(null);

    const [blurredRow, setBlurredRow] = useState(0);

    const addTimeBonus = (leaderboard_data) =>
    {
        for(const leaderboard_data_point of leaderboard_data)
        {
            const time_bonus = Math.round((1 - (leaderboard_data_point['quiz_length']/1000000))*leaderboard_data_point['score'])
            leaderboard_data_point['time_bonus'] = time_bonus;
            leaderboard_data_point['total_score'] = leaderboard_data_point['score'] + time_bonus;
        }
        leaderboard_data.push({
            user_name: 'Hubert + Furqan',
            score: 3000000,
            time_bonus: 1666666,
            total_score: 4666666
        });
        setLeaderboardList(leaderboard_data);
    }

    const addCommas = (number) =>
    {
        let numberStr = number.toString();
        return numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const fetchLeaderboardData = async () =>
    {
        setLoading(true);
        const res = await anlayticsAPILink.getFirstScorePerUserInSection('66aab9e436d9c10b75ab05b5');
        if(development)
        {
            console.log('GET FIRST SECTION SCORES CALL');
            console.log(res);
        }
        if(res['status'] !== 200)
        {
            if(res['status'] === 404)
            {
                setLeaderboardList([{
                    user_name: 'Hubert + Furqan',
                    score: 3000000,
                    time_bonus: 1666666,
                    total_score: 4666666
                }]);
            }
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

    const handleReveal = () =>
    {
        setBlurredRow(null);
    }

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
                            .map((record, index) => { 
                                const blurred = index === blurredRow ? 'blurred' : '';
                                const highlightedRow = index === 0 && !blurred ? 'highlight' : '';
                                return (
                                <tr key={index} className={`${blurred} ${highlightedRow}`}>
                                    <td>{index + 1}</td>
                                    <td>{record['user_name']}</td>
                                    <td className="classroom-leaderboard-row">{addCommas(record['score'])}</td>
                                    <td className="classroom-leaderboard-row">{addCommas(record['time_bonus'])}</td>
                                    <td className="classroom-leaderboard-row">{addCommas(record['total_score'])}</td>
                                </tr>
                            )}
                        )}
                    </tbody>
                </table>
            </div>
            <button className="edio-cta-button" onClick={handleReveal}>Reveal Number 1</button>
        </div>
    )
}
export default Leaderboard;
