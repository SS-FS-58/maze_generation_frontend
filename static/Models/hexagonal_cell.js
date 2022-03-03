
function hexagonal_cell(i, j) {
    this.col_num = i;
    this.row_num = j;
    
    this.coordinates =
        [
            { x: - Math.round(m_cell_size / 2), y: - Math.round(m_cell_height) },
            { x: Math.round(m_cell_size / 2), y: - Math.round(m_cell_height) },
            { x: m_cell_size, y: 0 },
            { x: Math.round(m_cell_size / 2), y: Math.round(m_cell_height) },
            { x: - Math.round(m_cell_size / 2), y: Math.round(m_cell_height) },
            { x: - m_cell_size, y: 0 }
        ];
    this.walls = [1, 1, 1, 1, 1, 1];
    this.visited = false;
    this.neighbors = [];

    this.prev = undefined;
    this.cal_criteria();
    this.get_x_y();
    this.getneighbors();
    

}
hexagonal_cell.prototype.cal_criteria = function() {

    if (m_shape_type == "Rectangular_hex"){
        m_criteria_x = m_cell_size * 3;
        m_criteria_y = m_cell_height * 4;

    }else if(m_shape_type == "Hexagonal_hex"){
        m_criteria_x = m_cell_size * 3;
        m_criteria_y = m_cell_height * 4 + m_cell_height * m_height;

    }
}
hexagonal_cell.prototype.getneighbors = function() {
    
  
    if (m_shape_type == "Rectangular_hex"){
        if (this.col_num % 2 == 0)
            this.neighbors = [[0, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
        else
            this.neighbors = [[0, -1], [1, -1], [1, 0], [0, 1], [-1, 0], [-1, -1]];
        // findding part outter wall 
        for (var i = 0; i < this.neighbors.length; i++){
            if((this.neighbors[i][0] + this.col_num) < 0 || (this.neighbors[i][0] + this.col_num) >= m_width){
                this.neighbors[i] = null;
                this.walls[i] = m_outter_wall_size;
            }else if((this.neighbors[i][1] + this.row_num) < 0 || (this.neighbors[i][1] + this.row_num) >= m_height){
                this.neighbors[i] = null;
                this.walls[i] = m_outter_wall_size;
            }
        }
    }else if(m_shape_type == "Hexagonal_hex"){
        if(this.col_num < m_width - 1)
            this.neighbors = [[0, -1], [1, 0], [1, 1], [0, 1], [-1, 0], [-1, -1]];
        else if (this.col_num == m_width - 1)
            this.neighbors = [[0, -1], [1, -1], [1, 0], [0, 1], [-1, 0], [-1, -1]];
        else
            this.neighbors = [[0, -1], [1, -1], [1, 0], [0, 1], [-1, 1], [-1, 0]];
        // findding part outter wall 
        for (var i = 0; i < this.neighbors.length; i++){
            if((this.neighbors[i][0] + this.col_num) < 0 || (this.neighbors[i][0] + this.col_num) >= m_width*2-1 ){
                this.neighbors[i] = null;
                this.walls[i] = m_outter_wall_size;
            }else if((this.neighbors[i][1] + this.row_num) < 0 || ((this.neighbors[i][1] + this.row_num - m_height) >= ((this.neighbors[i][0] + this.col_num) < m_height?(this.neighbors[i][0] + this.col_num):(m_height * 2 -(this.neighbors[i][0] + this.col_num)-2)))){
                this.neighbors[i] = null;
                this.walls[i] = m_outter_wall_size;
            }
        }
        

    }
}

var re_novisited;
hexagonal_cell.prototype.getNotVisitedNeighbors = function() {
    // 
    re_novisited = [];
    for(var i=0; i < this.neighbors.length; i++){
      if(this.neighbors[i]!=null && cells[this.col_num + this.neighbors[i][0]][this.row_num + this.neighbors[i][1]].visited==false && i != this.prev)
      {
        re_novisited.push(this.neighbors[i]);
      }
    }
  
    if( re_novisited.length == 0 )
        return null;
    else 
        return re_novisited;
      
}

hexagonal_cell.prototype.selectNeighbor = function(next){
    var re_neighbors = this.getNotVisitedNeighbors();
    if (re_neighbors == null)
        return null;
    var re_selectedneighbor = re_neighbors[Math.floor(Math.random() * re_neighbors.length)];

    // set next cell's prev
    for(var i=0; i < this.neighbors.length; i++){
        if(re_selectedneighbor == this.neighbors[i])
        {
            cells[this.col_num + this.neighbors[i][0]][this.row_num + this.neighbors[i][1]].prev = (i + 3) % 6;
        }
      }
    return re_selectedneighbor;
}

hexagonal_cell.prototype.removewall= function(next_neighbor, next){
    for (var j = 0; j < this.neighbors.length; j++) {
            if (this.neighbors[j] == next_neighbor) {
                this.walls[j] = 0;
                cells[next[0]][next[1]].walls[(j + 3) % this.neighbors.length] = 0;
                break;
            }
    }

}

hexagonal_cell.prototype.get_x_y = function () {
    if (m_shape_type == "Rectangular_hex"){
        this.x = m_criteria_x + this.col_num * m_cell_size * 3 / 2;
        this.y = m_criteria_y + this.row_num * m_cell_height * 2;
        if ( this.col_num % 2 == 1)
            this.y -= m_cell_height;
    }else if (m_shape_type == "Hexagonal_hex"){
        this.x = m_criteria_x + this.col_num * m_cell_size * 3 / 2;
        if( this.col_num < m_width)
            this.y = m_criteria_y + this.row_num * m_cell_height * 2 - m_cell_height * this.col_num;
        else
            this.y = m_criteria_y + this.row_num * m_cell_height * 2 - m_cell_height * (m_width * 2 -this.col_num -2 ) ;
        
    }
   

}
// draw cell function
hexagonal_cell.prototype.draw_cell = function () {

    
    var lines = [];
    var counter = 0;
    for (var i = 0; i < this.coordinates.length; i++) {

        if (i != (this.coordinates.length - 1)) {
            if (this.walls[i] > 0) {
                lines[counter] = document.createElementNS(svgNS, "line");
                lines[counter].setAttribute("x1", this.x + this.coordinates[i].x);
                lines[counter].setAttribute("y1", this.y + this.coordinates[i].y);
                lines[counter].setAttribute("x2", this.x + this.coordinates[i + 1].x);
                lines[counter].setAttribute("y2", this.y + this.coordinates[i + 1].y);
                lines[counter].setAttribute("stroke", "black");
                lines[counter].setAttribute("stroke-width", this.walls[i]);
                svg.appendChild(lines[counter]);
                counter++;
            }
        } else {
            if (this.walls[i] > 0) {
                lines[counter] = document.createElementNS(svgNS, "line");
                lines[counter].setAttribute("x1", this.x + this.coordinates[i].x);
                lines[counter].setAttribute("y1", this.y + this.coordinates[i].y);
                lines[counter].setAttribute("x2", this.x + this.coordinates[0].x);
                lines[counter].setAttribute("y2", this.y + this.coordinates[0].y);
                lines[counter].setAttribute("stroke", "black");
                lines[counter].setAttribute("stroke-width", this.walls[i]);
                svg.appendChild(lines[counter]);
                counter++;
            }
        }
    }

}
