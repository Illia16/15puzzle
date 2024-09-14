package game;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Arrays;
import java.util.List;
import javax.swing.table.DefaultTableModel;

public class UI extends JFrame {
    Game game;
    private JButton[] buttons = new JButton[16];

    public UI() {
        initUI();
    }

    public UI(Game game) {
        this();
        this.game = game;
        renderMainMenu();
        setVisible(true);
    }

    public void initUI() {
        setTitle("Game 15");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(400, 300);
        setLocationRelativeTo(null);
    }

    public void renderMainMenu() {
        JPanel mainPanel = new JPanel();
        mainPanel.setLayout(new BoxLayout(mainPanel, BoxLayout.Y_AXIS)); // Use Y_AXIS layout for vertical stacking
    
        // Create and add the results table panel
        JPanel resultsPanel = new JPanel();
        resultsPanel.setLayout(new BorderLayout());
        renderResultsTable(resultsPanel); // Render the results table into the resultsPanel
    
        mainPanel.add(resultsPanel); // Add the resultsPanel before the input components
    
        // Create and add the input components
        JPanel inputPanel = new JPanel();
        inputPanel.setLayout(new FlowLayout(FlowLayout.CENTER, 15, 15));
        JLabel label = new JLabel("Enter your name:");
        JTextField input = new JTextField(30);
        JButton startGameBtn = new JButton("Start Game");
    
        startGameBtn.addActionListener(new StartGame(input));
    
        inputPanel.add(label);
        inputPanel.add(input);
        inputPanel.add(startGameBtn);
    
        mainPanel.add(inputPanel); // Add the inputPanel after the resultsPanel
    
        getContentPane().add(mainPanel);
        pack();
    }

    public void renderButtons() {
        initUI();
        int[] nums = game.getData();

        for (int i = 0; i < nums.length; i++) {
            buttons[i] = new JButton(Integer.toString(nums[i]));
            add(buttons[i]);

            if (nums[i] == 0) {
                buttons[i].setVisible(false);
            } else {
                buttons[i].setBackground(Color.orange);
                buttons[i].setFont(new Font("DialogInput", Font.BOLD, 20));
            }

            buttons[i].addActionListener(e -> handleBtnClick(e));
        }

        setLayout(new GridLayout(4, 4));
    }

    public void handleBtnClick(ActionEvent e) {
        JButton clickedButton = (JButton) e.getSource();
        int clickedNum = Integer.parseInt(clickedButton.getText());
        int[] currentPosition = game.getXYCoordinates(clickedNum, game.getData());
        int[] currentPositionHole = game.getXYCoordinates(0, game.getData());
        game.setUserMoves(game.getUserMoves()+1);

        if (game.checkIfMovable(currentPosition, currentPositionHole)) {
            swapButtons(clickedNum);
        }
    }

    public void swapButtons(int clickedNum) {
        int idxNum = game.getNumberIndex(clickedNum, game.getData());
        int idxHole = game.getNumberIndex(0, game.getData());

        game.makeMove(clickedNum, idxNum, idxHole);
        // game.printBoard(game.getData());
        Container board = getContentPane();
        Component btn1 = board.getComponent(idxNum);
        Component zero = board.getComponent(idxHole);
        int btn1Index = board.getComponentZOrder(btn1);
        int holeIndex = board.getComponentZOrder(zero);
        board.setComponentZOrder(btn1, holeIndex);
        board.setComponentZOrder(zero, btn1Index);
        board.validate();

        if (Arrays.equals(game.getData(), game.getGaveOver())) {
            for (JButton button : buttons) {
                button.setBackground(Color.green);
                button.removeActionListener(button.getActionListeners()[0]);
            }

            game.stopTimer();
            showGameOverMsg();
        }
    }

    public void showGameOverMsg() {
        Timer timer = new Timer(1000, new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                Container container = getContentPane();
                container.removeAll();
                container.add(new JLabel("Game Over. Congrats, " + game.getUserName(), SwingConstants.CENTER));
                container.setBackground(Color.ORANGE);
                container.revalidate();
                container.repaint();
                game.postUsersData();
            }
        });
        timer.setRepeats(false);
        timer.start();
    }

    public class StartGame implements ActionListener {
        private JTextField userNameInput;

        public StartGame(JTextField v) {
            this.userNameInput = v;
        }

        @Override
        public void actionPerformed(ActionEvent e) {
            String name = userNameInput.getText();

            if (name != "") {
                game.startTimer();
                game.setUserName(name);
                getContentPane().removeAll();
                renderButtons();
            }
        }
    }

    public void renderResultsTable(JPanel resultsPanel) {
        // Fetch user data
        List<UserData> usersData = game.getUsersData();

        // Define column names
        String[] columnNames = {"Name", "Time", "Moves"};
    
        // Convert user data into rows for the table
        Object[][] rowData = new Object[usersData.size()][columnNames.length];
        for (int i = 0; i < usersData.size(); i++) {
            UserData user = usersData.get(i);
            rowData[i][0] = user.getName();
            rowData[i][1] = formatTime(user.getTime());
            rowData[i][2] = user.getMoves();
        }
    
        // Create a table model with data and column names
        DefaultTableModel tableModel = new DefaultTableModel(rowData, columnNames);
    
        // Create and set up the table
        JTable table = new JTable(tableModel);
        JScrollPane scrollPane = new JScrollPane(table);
        table.setFillsViewportHeight(true);
    
        // Add the table to the resultsPanel
        resultsPanel.setLayout(new BorderLayout());
        resultsPanel.add(scrollPane, BorderLayout.CENTER);
    }
    
    // Helper method to format time in MM:SS
    private String formatTime(int timeInSeconds) {
        int minutes = timeInSeconds / 60;
        int seconds = timeInSeconds % 60;
        return String.format("%02d:%02d", minutes, seconds);
    }
}
