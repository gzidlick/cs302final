mod utils;

extern crate js_sys;
extern crate web_sys;

use wasm_bindgen::prelude::*;
use std::fmt;

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
    Dead = 0,
    Alive = 1,
}

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells: Vec<Cell>,
}

impl Universe{
    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }
    fn live_neighbor_count(&self, row:u32, column: u32) -> u8 {
        let mut count = 0;
        for delta_row in [self.height - 1, 0, 1].iter().cloned() {
            for delta_col in [self.width - 1, 0, 1].iter().cloned() {
                if delta_row == 0 && delta_col == 0 {
                    continue;
                }

                let neighbor_row = (row + delta_row) % self.height;
                let neighbor_col = (column + delta_col) % self.width;
                let idx = self.get_index(neighbor_row, neighbor_col);
                count += self.cells[idx] as u8;
            }
        }
        count
    }
    
    /// Get the dead and alive cells from the whole universe
    pub fn get_cells(&self) -> &[Cell] { &self.cells }

    /// Set cells to be alive in a universe by passing the row and column
    /// of each cell as an array.
    pub fn set_cells(&mut self, cells: &[(u32, u32)]) {
        for (row, col) in cells.iter().cloned() {
            let idx = self.get_index(row, col);
            self.cells[idx] = Cell::Alive;
        }
    }


}

impl fmt::Display for Universe {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        for line in self.cells.as_slice().chunks(self.width as usize) {
            for &cell in line {
                let symbol = if cell == Cell::Dead { '◻' } else { '◼' };
                write!(f, "{}", symbol)?;
            }
            write!(f, "\n")?;
        }
        Ok(())
    }
}

#[wasm_bindgen]
impl Universe{
    /// Constructor
    pub fn new() -> Universe{
        utils::set_panic_hook();

        let width = 64;
        let height = 64;

        let cells = (0..width*height).map(|_| {
            if js_sys::Math::random() < 0.5 {
                Cell::Alive
            } else {
                Cell::Dead
            } })
        .collect();

        Universe {
            width,
            height,
            cells,
        }
    }

    /// Accessors
    /// Returns the height
    pub fn width(&self) -> u32 { self.width }
    /// Returns the height
    pub fn height(&self) -> u32 { self.height }
    /// Returns the Cells
    pub fn cells(&self) -> *const Cell { self.cells.as_ptr() }

    /// Renders the cells to a string
    pub fn render(&self) -> String { self.to_string() }

    /// Mutators

    /// Progesses the games state by one unit of time
    pub fn tick(&mut self) {
        let mut next = self.cells.clone();

        for row in 0..self.height {
            for col in 0..self.width{
                let idx = self.get_index(row, col);
                let cell = self.cells[idx];
                let live_neighbors = self.live_neighbor_count(row, col);

                log!("cell[{},{}] is {:?} and has {} live",
                     row, col, cell, live_neighbors
                     );

                let next_cell = match (cell, live_neighbors) {
                    (Cell::Alive, x) if x < 2 => Cell:: Dead,
                    (Cell::Alive, 2) | (Cell::Alive, 3) => Cell::Alive,
                    (Cell::Alive, x) if x > 3 => Cell::Dead,
                    (Cell::Dead, 3) => Cell::Alive,
                    (otherwise, _) => otherwise,
                };
                log!("it becomes {:?}", next_cell);

                next[idx] = next_cell;
            }
        }
        self.cells = next;
    }
    
    /// Set the width of the universe.
    ///
    /// Resets all cells to the dead state.
    pub fn set_width(&mut self, width: u32) {
        self.width = width;
        self.cells = (0..width * self.height).map(|_i| Cell::Dead).collect();
    }

    /// Set the height of the universe.
    ///
    /// Resets all cells to the dead state.
    pub fn set_height(&mut self, height: u32) {
        self.height = height;
        self.cells = (0..self.width * height).map(|_i| Cell::Dead).collect();
    }
}
