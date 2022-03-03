
function triangular_cell(i, j) {
    this.row_num = i;
    this.col_num = j;
    this.init();
    switch(m_shape_type){
        case "Hexagonal_tri":
            var cri = this.row_num < m_width ? 0 : 1;
            if( this.col_num % 2 == cri){
                this.upori = true;
                this.coordinates =
                    [
                        { x: 0, y: - Math.round(m_cell_height / 2) },
                        { x:   Math.round(m_cell_size), y: Math.round(m_cell_height / 2) },
                        { x: - Math.round(m_cell_size), y: Math.round(m_cell_height / 2) }
                    ];
            }else{
                this.upori = false;
                this.coordinates =
                    [
                        { x: 0, y:   Math.round(m_cell_height / 2) },
                        { x: - Math.round(m_cell_size), y: - Math.round(m_cell_height / 2) },
                        { x:   Math.round(m_cell_size), y: - Math.round(m_cell_height / 2) }
                    ];
            }
            break;
        case "Triangular":
            if( (this.col_num) % 2 == 0){
                this.coordinates =
                    [
                        { x: 0, y: - Math.round(m_cell_height / 2) },
                        { x:   Math.round(m_cell_size), y: Math.round(m_cell_height / 2) },
                        { x: - Math.round(m_cell_size), y: Math.round(m_cell_height / 2) }
                    ];
            }else{
                this.coordinates =
                    [
                        { x: 0, y:   Math.round(m_cell_height / 2) },
                        { x: - Math.round(m_cell_size), y: - Math.round(m_cell_height / 2) },
                        { x:   Math.round(m_cell_size), y: - Math.round(m_cell_height / 2) }
                    ];
            }
            break;
        case "Rectangular_tri":
            if( (i + j) % 2 == 0){
                this.coordinates =
                    [
                        { x: 0, y: - Math.round(m_cell_height / 2) },
                        { x:   Math.round(m_cell_size), y: Math.round(m_cell_height / 2) },
                        { x: - Math.round(m_cell_size), y: Math.round(m_cell_height / 2) }
                    ];
            }else{
                this.coordinates =
                    [
                        { x: 0, y:   Math.round(m_cell_height / 2) },
                        { x: - Math.round(m_cell_size), y: - Math.round(m_cell_height / 2) },
                        { x:   Math.round(m_cell_size), y: - Math.round(m_cell_height / 2) }
                    ];
            }
            break;
        default:
            break;
    }
    
    this.walls = [1, 1, 1];
    this.visited = false;
    this.neighbors = [];
    this.prev = undefined;
    this.get_x_y();
    this.getneighbors();

}

triangular_cell.prototype.init = function(){
    m_cell_height = Math.floor(m_cell_size * Math.sqrt(3));
    m_cell_height = m_cell_height + m_cell_height % 2;
    switch(m_shape_type){
        case "Hexagonal_tri":
            m_criteria_x = m_cell_size * 4 + m_cell_size * m_height;
            m_criteria_y = m_cell_height * 2;
            break;
        case "Triangular":
            m_criteria_x = m_cell_size * 4;
            m_criteria_y = m_cell_height * 2;
            break;
        case "Rectangular_tri":
            m_criteria_x = m_cell_size * 4;
            m_criteria_y = m_cell_height * 2;
            break;
        default:
            break;
    }
}

triangular_cell.prototype.getneighbors = function() {

    switch(m_shape_type){
        case "Hexagonal_tri":
            if(this.upori){
                if(this.row_num < m_width-1){
                    this.neighbors = [[0, 1], [1, 1], [0, -1]];
                }else if(this.row_num == m_width - 1){
                    this.neighbors = [[0, 1], [1, 0], [0, -1]];
                }else{
                    this.neighbors = [[0, 1], [1, -1], [0, -1]];
                }
    
            }else{
                if(this.row_num < m_width){
                    this.neighbors = [[0, -1], [-1, -1], [0, 1]];
                }else if(this.row_num == m_width){
                    this.neighbors = [[0, -1], [-1, 0], [0, 1]];
                }else{
                    this.neighbors = [[0, -1], [-1, 1], [0, 1]];
                }
            }
            
            // findding part outter wall 
            for (var i = 0; i < this.neighbors.length; i++){
                if((this.neighbors[i][0] + this.row_num) < 0 || (this.neighbors[i][0] + this.row_num) >= m_height * 2){
                    this.neighbors[i] = null;
                    this.walls[i] = m_outter_wall_size;
                }else if((this.neighbors[i][1] + this.col_num) < 0 || (this.neighbors[i][1] + this.col_num) >= 1 + 2 *(2 * m_height - 1-Math.floor(Math.abs(this.neighbors[i][0] + this.row_num-m_height+0.5)))){
                    this.neighbors[i] = null;
                    this.walls[i] = m_outter_wall_size;
                }
            }
            break;
        case "Triangular":
            if( (this.col_num ) % 2 == 0){
                this.neighbors = [[0, 1], [1, 1], [0, -1]];
            }else{
                this.neighbors = [[0, -1], [-1, -1], [0, 1]];
            }
            
            // findding part outter wall 
            for (var i = 0; i < this.neighbors.length; i++){
                if((this.neighbors[i][0] + this.row_num) < 0 || (this.neighbors[i][0] + this.row_num) >= m_height){
                    this.neighbors[i] = null;
                    this.walls[i] = m_outter_wall_size;
                }else if((this.neighbors[i][1] + this.col_num) < 0 || (this.neighbors[i][1] + this.col_num) > (this.row_num + this.neighbors[i][0]) * 2){
                    this.neighbors[i] = null;
                    this.walls[i] = m_outter_wall_size;
                }
            }
            break;
        case "Rectangular_tri":
            if( (this.col_num + this.row_num) % 2 == 0){
                this.neighbors = [[0, 1], [1, 0], [0, -1]];
            }else{
                this.neighbors = [[0, -1], [-1, 0], [0, 1]];
            }
            
            // findding part outter wall 
            for (var i = 0; i < this.neighbors.length; i++){
                if((this.neighbors[i][0] + this.row_num) < 0 || (this.neighbors[i][0] + this.row_num) >= m_height){
                    this.neighbors[i] = null;
                    this.walls[i] = m_outter_wall_size;
                }else if((this.neighbors[i][1] + this.col_num) < 0 || (this.neighbors[i][1] + this.col_num) >= m_width){
                    this.neighbors[i] = null;
                    this.walls[i] = m_outter_wall_size;
                }
            }
            break;
        default:
            break;
    }
}


var re_novisited;
triangular_cell.prototype.getNotVisitedNeighbors = function() {
    // 
    re_novisited = [];
    for(var i=0; i < this.neighbors.length; i++){
      if(this.neighbors[i]!=null && cells[this.row_num + this.neighbors[i][0]][this.col_num + this.neighbors[i][1]].visited==false && i != this.prev)
      {
        re_novisited.push(this.neighbors[i]);
      }
    }
  
    if( re_novisited.length == 0 )
        return null;
    else 
        return re_novisited;
      
}

triangular_cell.prototype.selectNeighbor = function(next){
    var re_neighbors = this.getNotVisitedNeighbors();
    if (re_neighbors == null)
        return null;
    var re_selectedneighbor = re_neighbors[Math.floor(Math.random() * re_neighbors.length)];

    // set next cell's prev
    for(var i=0; i < this.neighbors.length; i++){
        if(re_selectedneighbor == this.neighbors[i])
        {
            cells[this.row_num + this.neighbors[i][0]][this.col_num + this.neighbors[i][1]].prev = i;
        }
      }
    return re_selectedneighbor;
}

triangular_cell.prototype.removewall= function(next_neighbor, next){
    for (var j = 0; j < this.neighbors.length; j++) {
            if (this.neighbors[j] == next_neighbor) {
                this.walls[j] = 0;
                cells[next[0]][next[1]].walls[j] = 0;
                break;
            }
    }

}


triangular_cell.prototype.get_x_y = function () {
    switch(m_shape_type){
        case "Hexagonal_tri":
            this.y = m_criteria_y + this.row_num * m_cell_height;
            if( this.row_num < m_width)
                this.x = m_criteria_x + this.col_num * m_cell_size - m_cell_size * this.row_num;
            else 
                this.x =  m_criteria_x + this.col_num * m_cell_size - m_cell_size * (m_width * 2 -this.row_num -1 ) ;
            break;
        case "Triangular":
            this.x = m_criteria_x + m_height * m_cell_size + (this.col_num - this.row_num)* m_cell_size ;
            this.y = m_criteria_y + this.row_num * m_cell_height;
            break;
        case "Rectangular_tri":
            this.x = m_criteria_x + this.col_num * m_cell_size ;
            this.y = m_criteria_y + this.row_num * m_cell_height;
            break;
        default:
            break;
    }
    
}

triangular_cell.prototype.draw_cell = function () {

    
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


