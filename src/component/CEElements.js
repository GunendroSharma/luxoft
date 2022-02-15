import { makeStyles } from "@material-ui/core/styles";
import { getRoundFigure } from "../utils";

const useStyles = makeStyles((theme) => ({
  ceBackground: {
    display: "flex",
    background: (props) =>
      `linear-gradient(270deg,#274136 ${props.width}%, #1e252d 0)`
  }
}));

const CEElements = (props) => {
  const { price, count, amount, total, fullTotal } = props;
  const width = (total / fullTotal) * 100;
  const classes = useStyles({ width });
  const round = 3;

  return (
    <div className={classes.ceBackground}>
      <div className="count divStyle">{count}</div>
      <div className="divStyle">{getRoundFigure(amount, round)}</div>
      <div className="divStyle">{getRoundFigure(total, round)}</div>
      <div className="divStyle">{price}</div>
    </div>
  );
};

export default CEElements;
