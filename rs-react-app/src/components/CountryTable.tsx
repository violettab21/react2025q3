import type { Country } from '../types';

const CountryTable = ({ country }: { country: Country }) => {
  return (
    <div className="countryTable">
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Population</th>
            <th>CO2</th>
            <th>co2_per_capita</th>
            <th>cumulative_cement_co2</th>
          </tr>
        </thead>
        <tbody>
          {country.data
            .sort((a, b) => b.year - a.year)
            .map((yearData) => {
              return (
                <tr key={`${yearData.year}${yearData.cement_co2}`}>
                  <td>{yearData.year}</td>
                  <td>{yearData.population}</td>
                  <td>{yearData.cement_co2}</td>
                  <td>{yearData.cement_co2_per_capita}</td>
                  <td>{yearData.cumulative_cement_co2}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default CountryTable;
