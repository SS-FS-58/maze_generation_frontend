
var m_width = 20;
var m_height = 15;
var m_start_cols = Math.floor((m_width - 1) / 2);
var m_start_rows = 0;
var m_end_cols = Math.round(( m_width - 1) / 2);
var m_end_rows = m_height - 1;
var m_path_visible = true;
var m_path_color = "red";
var m_path_width = 1;


var current_cell_cr, current_cell;
var visited_cells =[];


var cells = [[]];


function init_cells() {
    for ( var i = 0 ; i < m_height ; i++){
        cells[i] = [];
        for (var j = 0 ; j < m_width ; j++ ){
            cells[i][j] = new triangular_cell(i, j);
            // cells[i][j].draw_cell();
        }
    }
    
}

function create_maze() {
    current_cell_cr = [m_start_rows, m_start_cols];
    current_cell = cells[m_start_rows][m_start_cols];
    current_cell.visited = true;

    visited_cells.push(current_cell_cr);

    while(visited_cells.length > 0){
        var next_neighbor = current_cell.selectNeighbor();
		if (next_neighbor) {

			next_cr = [current_cell_cr[0] + next_neighbor[0], current_cell_cr[1] + next_neighbor[1]];

			// STEP 1
            // grid[next].visited = true;
            current_cell = cells[next_cr[0]][next_cr[1]];
			current_cell.visited = true;

			// STEP 2
			visited_cells.push(next_cr);
			
			// STEP 3
			cells[current_cell_cr[0]][current_cell_cr[1]].removewall(next_neighbor, next_cr);

			// STEP 4
            current_cell_cr = next_cr;
            
            

		} else if (visited_cells.length > 0) {
            current_cell_cr = visited_cells.pop();
            current_cell = cells[current_cell_cr[0]][current_cell_cr[1]];
		}

    }
}

function draw_maze(){
    for ( var i = 0 ; i < m_height ; i++){
        for (var j = 0 ; j < m_width ; j++ ){
            cells[i][j].draw_cell();
        }
    }

}

function draw_path(){

    current_cell_cr[0] = m_end_rows;
    current_cell_cr[1] = m_end_cols;
    
    var points = "";
    while( current_cell_cr[0] != m_start_rows ||  current_cell_cr[1] != m_start_cols){
        points += cells[current_cell_cr[0]][current_cell_cr[1]].x + "," + cells[current_cell_cr[0]][current_cell_cr[1]].y + " ";   
        temp_cr = current_cell_cr[0] + cells[current_cell_cr[0]][current_cell_cr[1]].neighbors[cells[current_cell_cr[0]][current_cell_cr[1]].prev][0];
        current_cell_cr[1] = current_cell_cr[1] + cells[current_cell_cr[0]][current_cell_cr[1]].neighbors[cells[current_cell_cr[0]][current_cell_cr[1]].prev][1];
        current_cell_cr[0] = temp_cr;
            
    }
    points += cells[current_cell_cr[0]][current_cell_cr[1]].x + "," + cells[current_cell_cr[0]][current_cell_cr[1]].y + " ";
    var path_polygon = document.createElementNS(svgNS, "polyline");
    path_polygon.setAttribute("points", points)
    path_polygon.setAttribute("stroke", m_path_color);
    path_polygon.setAttribute("fill", "none");
    path_polygon.setAttribute("stroke-width", m_path_width);
    svg.appendChild(path_polygon);
}


init_cells();

create_maze();

draw_maze();

if( m_path_visible == true )
    draw_path();

