import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Arrays;

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
        JPanel panel = new JPanel();
        panel.setLayout(new FlowLayout(FlowLayout.CENTER, 15, 15));
        JLabel label = new JLabel("Enter your name:");
        JTextField input = new JTextField(30);
        JButton btn = new JButton("Ok");
        btn.addActionListener(new StartGame(input));
        panel.add(label);
        panel.add(input);
        panel.add(btn);
        getContentPane().add(panel);
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

        if (game.checkIfMovable(currentPosition, currentPositionHole)) {
            swapButtons(clickedNum);
        }
    }

    public void swapButtons(int clickedNum) {
        int idxNum = game.getNumberIndex(clickedNum, game.getData());
        int idxHole = game.getNumberIndex(0, game.getData());

        game.makeMove(clickedNum, idxNum, idxHole);
//        game.printBoard(game.getData());
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

            showGameOverMsg();
        }
    }

    public void showGameOverMsg() {
        Timer timer = new Timer(3000, new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                Container container = getContentPane();
                container.removeAll();
                container.add(new JLabel("Game Over. Congrats, " + game.getUserName(), SwingConstants.CENTER));
                container.setBackground(Color.ORANGE);
                container.revalidate();
                container.repaint();
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
                game.setUserName(name);
                getContentPane().removeAll();
                renderButtons();
            }
        }
    }
}
