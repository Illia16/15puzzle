package game;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserData {
    @JsonProperty("moves")
    private int moves;

    @JsonProperty("time")
    private int time;

    @JsonProperty("id")
    private String id;

    @JsonProperty("name")
    private String name;

    // Getters and setters
    public int getMoves() { return moves; }
    public void setMoves(int moves) { this.moves = moves; }

    public int getTime() { return time; }
    public void setTime(int time) { this.time = time; }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
