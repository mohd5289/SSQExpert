import React, { PureComponent } from "react";
import { connect } from "react-redux";
import "./GoalsAndObjectives.css";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import FormControls from "./FormControls";
import PropTypes from "prop-types";
import { getGoalsAndObjectives } from "../../actions/ssqActions";

class GoalsAndObjectives extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      goal: "",
      objective: "",
      goalsAndObjectivesConfirmed: false,
      checkedValue: "NONE",
    };
  }

  componentDidMount() {
    this.props.getGoalsAndObjectives();
  }
  onCheckChanged = (e) => {
    if (e.target.value === "YES") {
      this.setState({ goalsAndObjectivesConfirmed: true });
      this.setState({ checkedValue: e.target.value });
    }
    if (e.target.value === "NO") {
      this.setState({ checkedValue: e.target.value });
      this.setState({ goalsAndObjectivesConfirmed: false });
    }
    // this.setState({ checkedValue: e.target.value });
  };
  nextStep = () => {
    this.setState((prevState, props) => ({
      step: prevState.step + 1,
    }));
  };

  moveToNextStep = (confirmed) => {
    this.props.setGoalsAndObjectives(confirmed);
    this.props.nextStep();
  };

  componentWillReceiveProps(nextProps) {
    let goal = nextProps.goalsAndObjectives.goal;
    let objective = nextProps.goalsAndObjectives.objective;
    this.setState({ goal: goal, objective: objective });
    //  setState({ })
  }
  render() {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { duration: 0.3 } }}
          exit={{ scale: 0, transition: { delay: 0.9 } }}
          className="container"
        >
          <motion.p
            initial={{ x: 500, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: { delay: 0.3, duration: 0.3 },
            }}
            exit={{ x: -500, opacity: 0 }}
          >
            <strong>Goal:</strong>
            <br />
            <i>{this.state.goal}</i>
          </motion.p>
          <motion.p
            initial={{ x: 500, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: { delay: 0.6, duration: 0.3 },
            }}
            exit={{ x: -500, opacity: 0, transition: { delay: 0.3 } }}
          >
            <strong>Objective:</strong>
            <br />
            <i>{this.state.objective}</i>
          </motion.p>
          <motion.h5
            initial={{ x: 500, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: { delay: 0.9, duration: 0.3 },
            }}
            exit={{ x: -500, opacity: 0, transition: { delay: 0.6 } }}
          >
            Does the programme intend to follow the above Goal and Objective?
          </motion.h5>

          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { delay: 0.3 } }}
            className="form"
          >
            <div className="inputGroup">
              <input
                className="input"
                id="radio1"
                name="radio"
                type="radio"
                checked={this.state.checkedValue === "YES"}
                value="YES"
                onChange={this.onCheckChanged}
              />
              <label className="label" for="radio1">
                Yes
              </label>
            </div>
            <div className="inputGroup">
              <input
                className="input"
                id="radio2"
                name="radio"
                type="radio"
                checked={this.state.checkedValue === "NO"}
                value="NO"
                onChange={this.onCheckChanged}
              />
              <label className="label" for="radio2">
                No
              </label>
            </div>
          </motion.form>
          <FormControls wide={false}>
            <button
              style={{ color: "#944317" }}
              onClick={this.props.previousStep}
            >
              PREVIOUS STEP
            </button>
            <button
              style={{ color: "#5C9210" }}
              onClick={() =>
                this.moveToNextStep(this.state.goalsAndObjectivesConfirmed)
              }
            >
              NEXT STEP
            </button>
          </FormControls>
        </motion.div>
      </AnimatePresence>
    );
  }
}
GoalsAndObjectives.propTypes = {
  getGoalsAndObjectives: PropTypes.func.isRequired,
  goalsAndObjectives: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  goalsAndObjectives: state.ssq.goalsAndObjectives,
});
export default connect(mapStateToProps, { getGoalsAndObjectives })(
  GoalsAndObjectives
);
