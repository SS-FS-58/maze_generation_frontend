var m_shape_type;
var m_height = 15;
var m_width = 15;
var m_innner_r = 4;
var m_cell_size = 20;
var m_cell_height = m_cell_size;

var m_outter_wall_size = 3;
var m_inner_wall_size = 1;
var m_path_width = 1;

var m_start_cols = 0;
var m_start_rows = m_height - 1;
var m_end_cols = 0;
var m_end_rows = m_innner_r;
var m_path_color = "red";

var m_criteria_x ;
var m_criteria_y ;

// search temp variables
var current_cell_cr, current_cell;
var visited_cells =[];
// Main Maze cells variables
var cells = [[]];

const svgNS = "http://www.w3.org/2000/svg";
const svg = document.getElementById("maze_svg");

/// Draw Circles constants and functions
const cos = Math.cos;
const sin = Math.sin;
const pi= Math.PI;

const f_matrix_times = (( [[a,b], [c,d]], [x,y]) => [ a * x + b * y, c * x + d * y]);
const f_rotate_matrix = ((x) => [[cos(x),-sin(x)], [sin(x), cos(x)]]);
const f_vec_add = (([a1, a2], [b1, b2]) => [a1 + b1, a2 + b2]);

const f_svg_ellipse_arc = (([cx,cy],[rx,ry], [t1, delta], fai ) => {
    delta = delta % (2*pi);
    fai -= pi / 2;
    const rotMatrix = f_rotate_matrix (fai);
    const [sX, sY] = ( f_vec_add ( f_matrix_times ( rotMatrix, [rx * cos(t1), ry * sin(t1)] ), [cx,cy] ) );
    const [eX, eY] = ( f_vec_add ( f_matrix_times ( rotMatrix, [rx * cos(t1+delta), ry * sin(t1+delta)] ), [cx,cy] ) );
    const fA = ( (  delta > pi ) ? 1 : 0 );
    const fS = ( (  delta > 0 ) ? 1 : 0 );
    const path_2wk2r = document. createElementNS(svgNS, "path");
    path_2wk2r.setAttribute("d", "M " + sX + " " + sY + " A " + [ rx , ry , fai / (2*pi) *360, fA, fS, eX, eY ].join(" "));
    return path_2wk2r;
});

const f_svg_line_arc = (([cx,cy],[rin,rout], t1, fai ) => {
    fai -= pi / 2;
    const rotMatrix = f_rotate_matrix (fai);
    const [sX, sY] = ( f_vec_add ( f_matrix_times ( rotMatrix, [rin * cos(t1), rin * sin(t1)] ), [cx,cy] ) );
    const [eX, eY] = ( f_vec_add ( f_matrix_times ( rotMatrix, [rout * cos(t1), rout * sin(t1)] ), [cx,cy] ) );
    const path_line_arc = document. createElementNS(svgNS, "path");
    path_line_arc.setAttribute("d", "M " + sX + " " + sY + " L " + [ eX, eY ].join(" "));
    return path_line_arc;
});

const f_svg_dot = (([cx,cy],r , t1, fai ) => {
    fai -= pi / 2;
    const rotMatrix = f_rotate_matrix (fai);
    return ( f_vec_add ( f_matrix_times ( rotMatrix, [r * cos(t1), r * sin(t1)] ), [cx,cy] ) );    
});


