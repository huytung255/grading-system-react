import StarIcon from "@mui/icons-material/Star";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TableViewIcon from "@mui/icons-material/TableView";
const classNav = [
  {
    url: "/feed",
    name: "Feed",
    icon: <StarIcon />,
  },
  {
    url: "/participants",
    name: "Participants",
    icon: <PeopleAltIcon />,
  },
  {
    url: "/gradeBoard",
    name: "Grade board",
    icon: <TableViewIcon />,
    role: "teacher",
  },
];
export default classNav;
