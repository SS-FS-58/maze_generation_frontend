


function init_cells() {
    switch(m_shape_type){
        case "Circle_shape":
            for ( var i = m_innner_r ; i < m_height ; i++){
                cells[i] = [];
                var angle = 0;
                for (var j = 0; angle < 2 * pi; j++ ){
                    cells[i][j] = new circle_cell(i, j);
                    angle += cells[i][j].arc_angle;
                }
            }
            break;
        case "Triangular":
            for ( var i = 0 ; i < m_height ; i++){
                cells[i] = [];
                for (var j = 0 ; j < i * 2 + 1 ; j++ ){
                    cells[i][j] = new triangular_cell(i, j);
                }
            }
            break;
        case "Hexagonal_hex":
            m_cell_height = m_cell_size * Math.sqrt(3) / 2;
            for ( var i = 0 , inc_j = 0; i < m_width * 2 - 1; i++){
                cells[i] = [];            
                for (var j = 0 ; j < m_height + inc_j ; j++){
                    cells[i][j] = new hexagonal_cell(i, j);
                }
                i < m_width - 1 ? inc_j ++ : inc_j--;
            }
            break;
        case "Hexagonal_tri":
            for ( var i = 0 , inc_j = 0; i < m_width * 2; i++){
                cells[i] = [];            
                for (var j = 0 ; j < 2 * (m_height + inc_j) + 1; j++){
                    cells[i][j] = new triangular_cell(i, j);
                }
                i < m_width - 1 ? inc_j ++ : inc_j--;
                i == m_width - 1 ? inc_j++ : 0;
            }
            break;
        case "Rectangular_tri":
            for ( var i = 0 ; i < m_height ; i++){
                cells[i] = [];
                for (var j = 0 ; j < m_width ; j++ ){
                    cells[i][j] = new triangular_cell(i, j);
                }
            }
            break;
        case "Rectangular_squ":
            for ( var i = 0 ; i < m_width ; i++){
                cells[i] = [];
                for (var j = 0 ; j < m_height ; j++ ){
                    cells[i][j] = new rectangular_cell(i, j);
                }
            }
            break;
        case "Rectangular_hex":
            m_cell_height = m_cell_size * Math.sqrt(3) / 2;
            for ( var i = 0 ; i < m_width ; i++){
                cells[i] = [];
                for (var j = 0 ; j < m_height ; j++ ){
                    cells[i][j] = new hexagonal_cell(i, j);
                }
            }
            break;
        case "Rectangular_tri":
            for ( var i = 0 ; i < m_height ; i++){
                cells[i] = [];
                for (var j = 0 ; j < m_width ; j++ ){
                    cells[i][j] = new triangular_cell(i, j);
                }
            }
            break;
        default:
            break;
    }
    
    removeSVG();
    cal_start_end_pos();
}

function removeSVG(){

    var element = svg.getElementsByTagName('path');
    while(element.length > 0){
        svg.removeChild(element[0]);
        element = svg.getElementsByTagName('path');

    }
    var element = svg.getElementsByTagName('polyline');
    while(element.length > 0){
        svg.removeChild(element[0]);
        element = svg.getElementsByTagName('polyline');

    }
    var element = svg.getElementsByTagName('line');
    while(element.length > 0){
        svg.removeChild(element[0]);
        element = svg.getElementsByTagName('line');

    }
}

function cal_start_end_pos(){

    switch(m_shape_type){
        case "Hexagonal_tri":
            m_start_cols = m_width + m_width % 2 - 1;
            m_start_rows = 0;
            m_end_rows = m_width * 2 - 1;
            m_end_cols = m_width + m_width % 2 - 1;
            break;
        case "Hexagonal_hex":
            m_start_rows = m_width - 1;
            m_start_cols = 0;
            m_end_rows = m_width - 1;
            m_end_cols = m_height * 2 - 2;
            break;
        case "Circle_shape":
            m_start_cols = 0;
            m_start_rows = m_height - 1;
            m_end_rows = m_innner_r;
            m_end_cols = Math.floor(cells[m_innner_r][0].column_counter / 2);
            break;
        case "Triangular":
            m_start_cols = 0;
            m_start_rows = m_start_rows = Math.floor((m_height - 1) / 2);
            m_end_cols = Math.round(( m_width - 1) / 2) * 2;
            m_end_rows = m_height - 1;
            break;
        case "Rectangular_tri":
            m_start_cols = Math.floor((m_width - 1) / 2);
            m_start_rows = 0;
            m_end_cols = Math.round(( m_width - 1) / 2);
            m_end_rows = m_height - 1;
            break;
        case "Rectangular_squ":
            m_start_rows = Math.floor((m_width - 1) / 2);
            m_start_cols = 0;
            m_end_rows = Math.round(( m_width - 1) / 2);        
            m_end_cols = m_height - 1;
            break;
        case "Rectangular_hex":
            m_start_rows = Math.floor((m_width - 1) / 2);
            m_start_cols = 0;
            m_end_rows = Math.round(( m_width - 1) / 2);
            m_end_cols = m_height - 1;
            break;
        case "Rectangular_tri":
            m_start_rows = Math.floor((m_width - 1) / 2);
            m_start_cols = 0;
            m_end_rows = Math.round(( m_width - 1) / 2);
            m_end_cols = m_height - 1;
            break;
        default:
            break;
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
    switch(m_shape_type){
        case "Rectangular_squ":
            for ( var i = 0 ; i < m_width ; i++){
                for (var j = 0 ; j < m_height ; j++ ){
                    cells[i][j].draw_cell();
                }
            }
            break;
        case "Rectangular_tri":
            for ( var i = 0 ; i < m_height ; i++){
                for (var j = 0 ; j < m_width ; j++ ){
                    cells[i][j].draw_cell();
                }
            }
            break;
        case "Hexagonal_tri":
            for ( var i = 0 , inc_j = 0; i < m_width * 2; i++){
                for (var j = 0 ; j < 2 * (m_height + inc_j) + 1; j++){
                    cells[i][j].draw_cell();
                }
                i < m_width - 1 ? inc_j ++ : inc_j--;
                i == m_width - 1 ? inc_j++ : 0;
            }
        
            break;
        case "Hexagonal_hex":
            for ( var i = 0, inc_j = 0; i < m_width * 2 - 1; i++){
                for (var j = 0 ; j < m_height + inc_j ; j++){
                    cells[i][j].draw_cell();
                }
                i < m_width - 1 ? inc_j ++ : inc_j--;
                
            }
            break;
        case "Circle_shape":
            for ( var i = m_innner_r ; i < m_height ; i++){
                var angle = 0;
                for (var j = 0; angle < 2 * pi - cells[i][0].arc_angle / 2; j++ ){
                    angle += cells[i][j].arc_angle;
                    cells[i][j].draw_cell();
                }
            }
            break;
        case "Triangular":
            for ( var i = 0 ; i < m_height ; i++){
                for (var j = 0 ; j <  i * 2 + 1  ; j++ ){
                    cells[i][j].draw_cell();
                }
            }
            break;
        case "Rectangular_hex":
            for ( var i = 0 ; i < m_width ; i++){
                for (var j = 0 ; j < m_height ; j++ ){
                    cells[i][j].draw_cell(i,j);
                }
            }
            break;
        case "Rectangular_hex":
            for ( var i = 0 ; i < m_height ; i++){
                for (var j = 0 ; j < m_width ; j++ ){
                    cells[i][j].draw_cell(i,j);
                }
            }
            break;
        default:
            break;
    }
    
}

function draw_path(){

    // m_end_cols = Math.floor(cells[m_innner_r][0].column_counter / 2);
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
function getdata(){

    m_path_visible = solved.checked;
    var ShapeDropDownList = document.getElementById("ShapeDropDownList").value;
}
function mazegenerate () {
    
    getdata(); 
   
    init_cells();

    create_maze();

    draw_maze();

    if( m_path_visible == true )
        draw_path();
    if(document.getElementById("download-btn")){
        document.getElementById("MazeDetails").removeChild(document.getElementById("download-btn"));
    }
    exportSVG(document.getElementById('maze_svg'));
}
