---
slug: "decision-tree-algorithm"
title: The Decision Tree Algorithm
date: 2023-04-28
summary: The decision tree algorithm is one of the most used techniques when it comes to Machine Learning, I'll show you in depth how it works.
# 0 = WEB, 1 = BACKEND, 2 = OTHER
categories: [["Machine Learning", 1], ["Math", 1]]
---

There's a lot of algorithms that develop machine learning powered systems, without doubt one of the best out there is the Decision Tree algorithm, but how does it work behind the scenes?

## What is the Decision Tree Algorithm

Like its peers, is a technique that allows us to predict a value given certain data that may be connected. It's used in data mining, predictive modeling and classification. It works like a flowchart, where we begin from the root node, going through the decision nodes and finally reaching an output in one of the leaf nodes.

![Decision Tree Example](/images/posts/DecisionTree/DecisionTreeExample.jpg "Decision tree Example")

Like basically all of its siblings, the decision tree can be divided in two types

* Categorical: Let's say we need to find out if a email is spam or not according to the email contents, title, and sender, because the desired prediction is categorical (spam or not) what we need is a categorical tree.
* Continuous: But what if what we need is to predict the temperature in a room? or the rain probability? In these cases because the target value is continuous.

## How to create a Decision Tree

There are several ways to create decision trees, in this example we will use the ID3 algorithm, which receives 3 inputs, the samples, the target attribute and all the other attributes, giving us the final decision tree.
We will use the previous email case to create a categorical tree. Like we discussed earlier, our attributes are gonna be if the email contains shady links, a spam like title and if the sender has a weird email account, with **is it spam?** being our target attribute. The first step is to collect data to create the tree from, like the following:

<style>
.first-dataset tbody tr:nth-child(1) td:last-of-type, .first-dataset tr:nth-child(2) td:last-of-type, .first-dataset tr:nth-child(3) td:last-of-type, .first-dataset tr:nth-child(6) td:last-of-type, .first-dataset tr:nth-child(9) td:last-of-type {
  background-color: #37AA78!important;
  color: #f4f4f4!important;
  font-weight: bold;
}
.first-dataset tr:nth-child(4) td:last-of-type, .first-dataset tr:nth-child(5) td:last-of-type, .first-dataset tr:nth-child(7) td:last-of-type, .first-dataset tr:nth-child(8) td:last-of-type{
  background-color: #AA3737!important;
  color: #f4f4f4!important;
  font-weight: bold;
}
</style>
<div class="first-dataset">

| Shady content? | Weird title? | Weird sender email? | Is it spam? |
| -------------- | ------------ | ------------------- | ----------- |
| Yes            | No           | Yes                 | Yes         |
| No             | Yes          | Yes                 | Yes         |
| No             | No           | Yes                 | Yes         |
| No             | Yes          | No                  | No          |
| No             | No           | No                  | No          |
| Yes            | No           | Yes                 | Yes         |
| No             | Yes          | No                  | No          |
| No             | No           | No                  | No          |
| Yes            | No           | No                  | Yes         |

</div>

## The math

### Entropy

Now that we have everything we need, we can begin with the math. First we need to calculate the entropy of the data, which is only a fancy way to call the diversity of the data. The higher the entropy, the more random is gonna be the data, and the opposite is true. The entropy of a dataset is given by this formula:

$$H(\text{samples})=-\bigg(\sum_{v} \frac{\text{Samples}(v)}{\text{Total Samples}}\log_2\frac{\text{Samples}(v)}{\text{Total Samples}}\bigg)$$

These formula refers to the target sample, we have to get every value that v can have (in this case if its spam or not) and apply the formula. Simplified, it would look somewhat like:

$$ -(\frac{5}{9}\log_2(\frac{5}{9}) + \frac{4}{9}\log_2(\frac{4}{9}))$$

Where the 5 represents the number of "yes" or true values, the 4 represent the noes, and 9 the total of samples.

The previous formula gives us an entropy of $\bold{0.94029}$.

Let'ts obtain the information gain for every attribute, except spam. The information gain let us know how valuable an attribute is when determining the outcome, the higher, the better. The following formula let us know the information gain for each attribute A:

$$IG(\text{samples}, A) = H(\text{samples}) - \sum_{t\in T}\frac{t}{\text{samples}}\cdot H(t)$$

Next we need to calculate the IG for each attribute:

### First iteration

---

#### Content

$$
    H(content, Yes) = -(\frac{3}{3}\log_2(\frac{3}{3}) + 0) = 0
$$

$$
    H(content, No) = -(\frac{2}{6}\log_2(\frac{2}{6}) + \frac{4}{6}\log_2(\frac{4}{6})) = 0.9182
$$

$$
    IG(content) = H(\text{samples}) - (\frac{3}{9}\cdot H(content, Yes) + \frac{6}{9}\cdot H(content, No)) = 0.3280
$$

#### Title

$$
    H(title, Yes) = -(\frac{1}{3}\log_2(\frac{1}{3}) + \frac{2}{3}\log_2(\frac{2}{3})) = 0.9182
$$

$$
    H(title, No) = -(\frac{4}{6}\log_2(\frac{4}{6}) + \frac{2}{6}\log_2(\frac{2}{6})) = 0.9182
$$

$$
    IG(title) = H(\text{samples}) - (\frac{3}{9}\cdot H(title, Yes) + \frac{6}{9}\cdot H(title, No)) = 0.022
$$

#### Sender

$$
    H(sender, Yes) = -(\frac{4}{4}\log_2(\frac{4}{4}) + 0) = 0
$$

$$
    H(sender, No) = -(\frac{5}{6}\log_2(\frac{5}{6}) +\frac{1}{6}\log_2(\frac{1}{6})) = 0.6500
$$

$$
    IG(sender) = H(\text{samples}) - (\frac{4}{9}\cdot H(sender, Yes) + \frac{6}{9}\cdot H(sender, No)) = 0.506
$$

Now we compare the information gain from each attribute and establish the bigger one as our root node, in this case sender is the one with the higher IG (0.506), and because the entropy of the "yes" was 0, we put it as a leaf node. So far this is our tree:

![First tree](/images/posts/DecisionTree/tree1.jpg "First tree")

Now we have to continue developing the tree until we find a decision node that only has leaf nodes attached. But don't worry, since we took care of the "sender" attribute, we only have to work with content and title, and since yes resulted in a leaf node, we only have to use the tuples where sender is "no", this means we end up with the next dataset:

<style>
.second-dataset tr:nth-child(5) td:last-of-type {
  background-color: #37AA78!important;
  color: #f4f4f4!important;
  font-weight: bold;
}
.second-dataset tbody tr:nth-child(1) td:last-of-type, .second-dataset tr:nth-child(2) td:last-of-type, .second-dataset tr:nth-child(3) td:last-of-type, .second-dataset tr:nth-child(4) td:last-of-type{
  background-color: #AA3737!important;
  color: #f4f4f4!important;
  font-weight: bold;
}
</style>

<div class="second-dataset">

| Shady content? | Weird title? | Weird sender email? | Is it spam? |
| -------------- | ------------ | ------------------- | ----------- |
| No             | Yes          | No                  | No          |
| No             | No           | No                  | No          |
| No             | Yes          | No                  | No          |
| No             | No           | No                  | No          |
| Yes            | No           | No                  | Yes         |

</div>

Now all that's left is to calculate the IG of Shady content and the weird title, plus the entropy of sender=no.

### Second iteration

---

#### Entropy

$$
    H(sender=no) = -(\frac{4}{5}\log_2(\frac{4}{5}) + \frac{1}{5}\log_2(\frac{1}{5})) = 0.7219
$$

#### Content

$$
    H(content, Yes) = -(\frac{4}{4}\log_2(\frac{4}{4}) + 0) = 0
$$

$$
    H(content, No) = -(\frac{1}{1}\log2(\frac{1}{1}) + 0) = 0
$$

$$
    IG(content) = H(\text{sender=no}) - (\frac{4}{5}\cdot H(content, Yes) + \frac{1}{5}\cdot H(content, No)) = 0.7219
$$

#### Title

$$
    H(title, Yes) = -(0 + \frac{2}{2}\log2(\frac{2}{2})) = 0
$$

$$
    H(title, No) = -(\frac{1}{3}\log_2(\frac{1}{3}) + \frac{2}{3}\log_2(\frac{2}{3})) = 0.8112
$$

$$
    IG(title) = H(\text{sender=no}) - (\frac{2}{5}\cdot H(title, Yes) + \frac{3}{5}\cdot H(title, No)) = 0.2351
$$

As we can see, content is now the attribute that gives us the most IG, and since both yes and no gave us 0 entropy we set them as leaf nodes, and that's it! Our tree ends up like this:

![Final tree](/images/posts/DecisionTree/finalTree.jpg "Final tree")

### Testing

We can include new data to see how well the tree behave, try classifying the next tuple:

<style>
    .test-dataset tbody tr:nth-child(1) td:last-of-type{
          background-color: #37AA78!important;
  color: #f4f4f4!important;
  font-weight: bold;
    }
</style>
<div class="test-dataset">

| Shady content? | Weird title? | Weird sender email? | Is it spam? |
| -------------- | ------------ | ------------------- | ----------- |
| Yes            | No           | No                  | Yes         |

</div>

## Conclusion

We learned how to create a decision tree using the ID3 algorithm, and the math behind it. Even though the decision tree can be helpful, there are a lot of algorithms better at classifiying data, like the random forest, nonetheless, it's important to know how this algorithms behave in order to gain a better understanding of machine learning.
